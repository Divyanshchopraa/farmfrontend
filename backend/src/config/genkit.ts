import { genkit } from 'genkit';
import { googleAI, gemini20Flash, gemini25FlashLite } from '@genkit-ai/googleai';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.GOOGLE_GENAI_API_KEY) {
    console.warn('GOOGLE_GENAI_API_KEY not set. Genkit interaction will fail.');
}

export const ai = genkit({
    plugins: [
        googleAI({
            apiKey: process.env.GOOGLE_GENAI_API_KEY,
        }),
    ],
    model: gemini20Flash, // Default model
});

export const visionModel = gemini25FlashLite ; // Use Pro for vision tasks if needed
