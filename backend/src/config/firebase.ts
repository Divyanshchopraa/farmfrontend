import * as admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';
import serviceAccount from "../../firebase-config.json"
import { ServiceAccount } from "firebase-admin";
dotenv.config();

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount as ServiceAccount),
        });
        console.log('Firebase Admin initialized successfully');
    } catch (error) {
        console.error('Error initializing Firebase Admin:', error);
}

export const db = admin.firestore();
export const auth = admin.auth();
