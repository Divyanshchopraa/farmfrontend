import * as cron from 'node-cron';
import { db } from '../config/firebase'; // firebase-admin
import * as admin from 'firebase-admin';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const QUESTIONS_PER_DAY = 100;

interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswerIndex: number;
}

// Generate Questions Daily
export const generateQuestions = async () => {
    console.log('Generating daily questions...');
    try {
        const prompt = `Generate ${QUESTIONS_PER_DAY} multiple-choice questions about crops, agriculture, and plant diseases.
    Format the output as a strictly valid JSON array of objects. 
    Each object should have: "text" (string), "options" (array of 4 strings), "correctAnswerIndex" (index of the correct option).
    Do not include markdown formatting like \`\`\`json. Just the raw JSON.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        // Clean up markdown code blocks if present (Gemini sometimes adds them despite instructions)
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const questions: Question[] = JSON.parse(jsonString);

        // Store in Firestore
        // Strategy: A collection 'daily_questions' where document ID is the index '0', '1', ...
        // Or a single document 'daily/today' with a big array. 
        // User asked for "index in the array as their id". 
        // Firestore max document size is 1MB. 100 questions might fit, but separate docs are safer/scalable.
        // Let's use a subcollection or a root collection 'questions' and overwrite/delete old ones? 
        // Or just 'daily_questions/{index}'

        const batch = db.batch();

        // Delete old questions (optional or just overwrite)
        // For simplicity, let's just overwrite indices 0-99.

        questions.forEach((q, index) => {
            if (index < QUESTIONS_PER_DAY) {
                const docRef = db.collection('questions').doc(index.toString());
                batch.set(docRef, { ...q, id: index });
            }
        });

        await batch.commit();
        console.log('Daily questions stored.');

        // Reset User Indices
        await resetUserIndices();

    } catch (error) {
        console.error('Error generating questions:', error);
    }
};

const resetUserIndices = async () => {
    console.log('Resetting user indices...');
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get(); // Warning: Reads all users. OK for MVP.

    if (snapshot.empty) return;

    const BATCH_SIZE = 500;
    let batch = db.batch();
    let count = 0;

    snapshot.docs.forEach((doc) => {
        batch.update(doc.ref, { qnIndex: 0 });
        count++;

        if (count >= BATCH_SIZE) {
            batch.commit();
            batch = db.batch();
            count = 0;
        }
    });

    if (count > 0) {
        await batch.commit();
    }
    console.log('User indices reset.');
};

// Cron Job: Run at midnight every day
// '0 0 * * *'
export const initCronJob = () => {
    // cron.schedule('', () => {
    //     console.log("cron about to run")
    //     generateQuestions();
    // });
    console.log('Quiz Cron Job initialized.');
};

// User Logic
export const getQuestionForUser = async (userId: string) => {
    const userDoc = await db.collection('users').doc(userId).get();
    let qnIndex = 0;

    if (!userDoc.exists) {
        // Create new user if not exists
        await db.collection('users').doc(userId).set({ qnIndex: 0, score: 0 });
    } else {
        qnIndex = userDoc.data()?.qnIndex || 0;
    }

    if (qnIndex >= QUESTIONS_PER_DAY) {
        return { message: "You have completed today's quiz!" };
    }

    const qDoc = await db.collection('questions').doc(qnIndex.toString()).get();
    if (!qDoc.exists) {
        return { message: "Question not found (maybe generation failed?)" };
    }

    const qData = qDoc.data() as Question;
    // Exclude correct answer from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { correctAnswerIndex, ...qForUser } = qData;
    return qForUser;
};

export const submitAnswer = async (userId: string, answer: string) => {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) throw new Error('User not found');

    const userData = userDoc.data();
    const qnIndex = userData?.qnIndex || 0;

    if (qnIndex >= QUESTIONS_PER_DAY) {
        return { message: "Already finished today's quiz", score: userData?.score };
    }

    const qDoc = await db.collection('questions').doc(qnIndex.toString()).get();
    if (!qDoc.exists) throw new Error('Question not found');

    const qData = qDoc.data() as Question;
    const isCorrect = answer === qData.options[qData.correctAnswerIndex];
    const scoreChange = isCorrect ? 5 : -5;

    await userRef.update({
        score: admin.firestore.FieldValue.increment(scoreChange),
        qnIndex: admin.firestore.FieldValue.increment(1)
    });

    return {
        correct: isCorrect,
        correctAnswer: qData.correctAnswerIndex,
        newScore: (userData?.score || 0) + scoreChange
    };
};


