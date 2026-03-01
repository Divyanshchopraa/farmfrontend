import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

import router from './routes/api';
import { initCronJob } from './services/quizService';

// ...

app.use(cors());
app.use(express.json());

app.use('/api', router);

initCronJob();

app.get('/', (req, res) => {
    res.send('Crop Disease Analysis Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
