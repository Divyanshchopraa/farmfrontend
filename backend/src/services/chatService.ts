import { ai, visionModel } from '../config/genkit';
import { db } from '../config/firebase';
import { MessageData } from 'genkit';

const CHATS_COLLECTION = 'chats';
const ANALYSIS_COLLECTION = 'user-analysis';

const SYSTEM_PROMPT = (analysisContext: string, language: string) => `
You are an expert plant pathologist assistant continuing a conversation about a crop analysis.

Here is the original analysis that was performed on the user's crop image:
${analysisContext}

Your role:
- Answer follow-up questions about this analysis clearly and helpfully.
- Provide additional detail on diseases, treatments, preventive measures, or anything related.
- If the user asks something unrelated to agriculture or crop health, politely redirect them.
- Be practical and give advice suitable for small to mid-scale farmers in India.

Respond in ${language} ONLY.
`;

export const createChat = async (
    analysisId: string,
    userMessage: string,
    language: string = 'en'
) => {
    // Fetch the original analysis
    const analysisDoc = await db.collection(ANALYSIS_COLLECTION).doc(analysisId).get();
    if (!analysisDoc.exists) {
        throw new Error(`Analysis with ID ${analysisId} not found`);
    }

    const analysisData = analysisDoc.data();
    const analysisContext = JSON.stringify(analysisData?.data, null, 2);

    const chatId = crypto.randomUUID();
    const systemPrompt = SYSTEM_PROMPT(analysisContext, language);

    // Call ai.generate with system prompt and user message as the prompt
    const result = await ai.generate({
        model: visionModel,
        system: systemPrompt,
        prompt: [{ text: userMessage }],
        config: { temperature: 0.4 },
    });

    const responseText = result.text;

    // Build the messages array to persist for future turns
    const messages: MessageData[] = [
        { role: 'user', content: [{ text: userMessage }] },
        { role: 'model', content: [{ text: responseText }] },
    ];

    // Store in Firestore
    await db.collection(CHATS_COLLECTION).doc(chatId).set({
        analysisId,
        language,
        systemPrompt,
        messages,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    return { chatId, response: responseText };
};

export const sendMessage = async (
    chatId: string,
    userMessage: string
) => {
    // Load existing chat
    const chatDoc = await db.collection(CHATS_COLLECTION).doc(chatId).get();
    if (!chatDoc.exists) {
        throw new Error(`Chat with ID ${chatId} not found`);
    }

    const chatData = chatDoc.data()!;
    const messages: MessageData[] = chatData.messages;
    const systemPrompt: string = chatData.systemPrompt;

    // Use existing messages as history and send the new user message as prompt
    const result = await ai.generate({
        model: visionModel,
        system: systemPrompt,
        messages,
        prompt: [{ text: userMessage }],
        config: { temperature: 0.4 },
    });

    const responseText = result.text;

    // Append both the user message and model response to the history
    messages.push({ role: 'user', content: [{ text: userMessage }] });
    messages.push({ role: 'model', content: [{ text: responseText }] });

    // Update Firestore
    await db.collection(CHATS_COLLECTION).doc(chatId).update({
        messages,
        updatedAt: new Date(),
    });

    return { response: responseText };
};
