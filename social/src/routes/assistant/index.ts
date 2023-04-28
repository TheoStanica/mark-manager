import express from 'express';
import { askMeRouter } from './routes/ask';
import { planRouter } from './routes/plan';

const assistantApi = express.Router();

assistantApi.use(askMeRouter);
assistantApi.use(planRouter);

export { assistantApi };
