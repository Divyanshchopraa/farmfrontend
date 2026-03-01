import { Router } from 'express';
import { analyzeImage, uploadMiddleware } from '../controllers/analysisController';
import { getDailyQuestion, answerQuestion, triggerGeneration } from '../controllers/quizController';
import { startChat, continueChat } from '../controllers/chatController';

const router = Router();

// Analysis Routes
router.post('/analyze', uploadMiddleware, analyzeImage);

// Chat Routes
router.post('/chat/start', startChat);
router.post('/chat/:chatId/message', continueChat);

// Quiz Routes
router.get('/quiz/question', getDailyQuestion);
router.post('/quiz/answer', answerQuestion);
router.post('/quiz/generate', triggerGeneration); // Dev/Cron trigger

export default router;
