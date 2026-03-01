import {ai, visionModel} from '../config/genkit';
import {pinecone, indexName} from '../config/pinecone';
import {geminiEmbedding001} from '@genkit-ai/googleai'; // the embedding model ref

export const analyzeCropImage = async (imageBuffer: Buffer, mimeType: string, language:string) => {
    try {
        const base64Image = `data:${mimeType};base64,${imageBuffer.toString('base64')}`;

        // Step 1: Preliminary image description
        const result1 = await ai.generate({
            model: visionModel,
            prompt: [
                {text: "Describe this crop image and any visible symptoms of disease in detail."},
                {media: {url: base64Image}}
            ],
            config: {temperature: 0.4}
        });
        const description = result1.text;

        // Step 2: Embed the description using Genkit's native embed()
        // const embeddingResponse = await ai.embed({
        //     embedder: 'googleai/geminiembeddings001',   // or 'googleai/text-embedding-004'
        //     content: description,
        // });
        // const vector = embeddingResponse[0].embedding; // float[]
        //
        // // Step 3: Query Pinecone
        // const index = pinecone.index(indexName);
        // const queryResponse = await index.query({
        //     vector,
        //     topK: 3,
        //     includeMetadata: true,
        // });
        //
        // const retrievedContext = queryResponse.matches
        //     .map(match => match.metadata?.diagnosis)
        //     .filter(Boolean)
        //     .join('\n---\n');

        // Step 4: Final diagnosis with RAG context
//
// RAG Context (similar cases from database):
// ${retrievedContext}
const finalResult = await ai.generate({
            model: visionModel,
            prompt: [
                {
                    text: `
You are an expert plant pathologist.

Analyze the provided crop image carefully.

Your tasks:
1. Identify the crop (if possible).
2. Identify any visible disease, pest infestation, nutrient deficiency, or stress.
3. Suggest practical, actionable treatment steps suitable for small to mid-scale farmers in India.
4. If the image is unclear, explicitly say so instead of guessing.

If any external context is irrelevant, ignore it.

STRICT RULES:
- Respond ONLY in valid JSON.
- Do NOT include explanations outside JSON.
- Do NOT use markdown.
- Do NOT add extra fields.
- If uncertain, state "Unknown" instead of hallucinating.

FOLLOW THIS EXACT JSON SCHEMA:

{
  "crop_name": "string",
  "disease_or_issue": "string",
  "confidence_level": "Low | Medium | High",
  "analysis": "Detailed explanation of what is visible in the image and why this issue is suspected.",
  "recommended_measures": [
    "Clear step 1",
    "Clear step 2",
    "Clear step 3"
    ...
  ]
}

Respond in ${language} ONLY.
`
                }
            ]
        });

        return {
            diagnosis:finalResult.text,
            // similarCases: queryResponse.matches,
        };

    } catch (error) {
        console.error("Error in analyzeCropImage:", error);
        throw error;
    }
};