import { Request, Response } from 'express';
import { createChat, sendMessage } from '../services/chatService';

export const startChat = async (req: Request, res: Response) => {
    const { analysisId, message, language } = req.body;

    if (!analysisId || !message) {
        return res.status(400).json({ error: 'analysisId and message are required' });
    }

    try {
        const result = await createChat(analysisId, message, language);
        res.json(result);
    } catch (error: any) {
        console.error('Failed to start chat:', error);
        if (error.message?.includes('not found')) {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Failed to start chat' });
    }
};

export const continueChat = async (req: Request, res: Response) => {
    const chatId = req.params.chatId as string;
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'message is required' });
    }

    try {
        const result = await sendMessage(chatId, message);
        res.json(result);
    } catch (error: any) {
        console.error('Failed to continue chat:', error);
        if (error.message?.includes('not found')) {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Failed to continue chat' });
    }
};
