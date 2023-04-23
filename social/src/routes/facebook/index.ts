import express from 'express';
import { facebookPagesFeedRouter } from './routes/feed';
import { facebookMeRouter } from './routes/me';
import { facebookPagesRouter } from './routes/pages';
import { facebookScheduleRouter } from './routes/schedule';
import { facebookPostPagesRouter } from './routes/post';

const facebookApi = express.Router();

facebookApi.use(facebookMeRouter);
facebookApi.use(facebookPagesRouter);
facebookApi.use(facebookPagesFeedRouter);
facebookApi.use(facebookScheduleRouter);
facebookApi.use(facebookPostPagesRouter);

export { facebookApi };
