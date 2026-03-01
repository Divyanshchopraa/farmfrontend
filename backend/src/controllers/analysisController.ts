import {Request, Response} from 'express';
import {analyzeCropImage} from '../services/analysisService';
import multer from 'multer';
import {db} from "../config/firebase"

const upload = multer({storage: multer.memoryStorage()});

export const uploadMiddleware = upload.single('image');

export const analyzeImage = async (req: Request, res: Response) => {
    let language = (req.body.language) ? req.body.language : 'en';
    let uid = crypto.randomUUID()
    if (!req.file) {
        return res.status(400).json({error: 'No image file provided'});
    }

    try {
        const {buffer, mimetype} = req.file;
        const result = await analyzeCropImage(buffer, mimetype, language);
        await db.collection('user-analysis').doc(uid).set({data:JSON.parse(result.diagnosis), timestamp: new Date()});
        res.json(JSON.parse(result.diagnosis));
    } catch (error) {
        console.error('Analysis failed:', error);
        res.status(500).json({error: 'Failed to analyze result'});
    }
};
