import express from 'express';
import { twitterApi } from './twitter';
const apiRouter = express.Router();

apiRouter.use('/twitter', twitterApi);

export { apiRouter };
