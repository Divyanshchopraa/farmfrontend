import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';

dotenv.config();

const pineconeApiKey = process.env.PINECONE_API_KEY;

if (!pineconeApiKey) {
    console.warn('PINECONE_API_KEY not set in .env. Pinecone features will not work.');
}

export const pinecone = new Pinecone({
    apiKey: pineconeApiKey || '',
});

export const indexName = process.env.PINECONE_INDEX || 'crop-diseases';
