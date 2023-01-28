import express from 'express';
import { twitterAccountsRouter } from './accounts';
import { twitterApi } from './twitter';
const apiRouter = express.Router();

apiRouter.use('/', twitterAccountsRouter);
apiRouter.use('/twitter', twitterApi);

export { apiRouter };
