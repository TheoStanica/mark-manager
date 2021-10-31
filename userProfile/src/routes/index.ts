import express from 'express';
import { showCurrentUserRouter } from './show';
import { streamPreferencesRouter } from './stream-preferences';
import { updateCurrentUserRouter } from './update';
import { uploadImageRouter } from './uploadimage';

const apiRouter = express.Router();

apiRouter.use(showCurrentUserRouter);
apiRouter.use(streamPreferencesRouter);
apiRouter.use(updateCurrentUserRouter);
apiRouter.use(uploadImageRouter);

export { apiRouter };
