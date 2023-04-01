import express from 'express';
import { facebookMeRouter } from './routes/me';
import { facebookPagesRouter } from './routes/pages';

const facebookApi = express.Router();

facebookApi.use(facebookMeRouter);
facebookApi.use(facebookPagesRouter);

export { facebookApi };
