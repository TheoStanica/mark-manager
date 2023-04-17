import express from 'express';
import { facebookPagesFeedRouter } from './routes/feed';
import { facebookMeRouter } from './routes/me';
import { facebookPagesRouter } from './routes/pages';

const facebookApi = express.Router();

facebookApi.use(facebookMeRouter);
facebookApi.use(facebookPagesRouter);
facebookApi.use(facebookPagesFeedRouter);

export { facebookApi };
