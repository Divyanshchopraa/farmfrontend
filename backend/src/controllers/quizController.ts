import { Request, Response } from 'express';
import { getQuestionForUser, submitAnswer, generateQuestions } from '../services/quizService';

export const getDailyQuestion = async (req: Request, res: Response) => {
    const userId = req.body.userId || req.query.userId; // Expecting userId in body or query for mvp
    if (!userId) {
        return res.status(400).json({ error: 'UserId is required' });
    }

    try {
        const question = await getQuestionForUser(userId as string);
        res.json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch question' });
    }
};

export const answerQuestion = async (req: Request, res: Response) => {
    const { userId, answer } = req.body;
    if (!userId || !answer) {
        return res.status(400).json({ error: 'UserId and answer are required' });
    }

    try {
        const result = await submitAnswer(userId, answer);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to submit answer' });
    }
};

// Dev endpoint to trigger generation manually
export const triggerGeneration = async (req: Request, res: Response) => {
    try {
        await generateQuestions();
        res.json({ message: 'Generation triggered' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Generation failed' });
    }
};
