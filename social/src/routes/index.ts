import express from 'express';
import { twitterAccountsRouter } from './accounts';
import { facebookApi } from './facebook';
import { twitterApi } from './twitter';
import { assistantApi } from './assistant';
const apiRouter = express.Router();

apiRouter.use('/', twitterAccountsRouter);
apiRouter.use('/twitter', twitterApi);
apiRouter.use('/facebook', facebookApi);
apiRouter.use('/assistant', assistantApi);

export { apiRouter };
