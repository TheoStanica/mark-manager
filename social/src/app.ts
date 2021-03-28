import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError } from '@tcosmin/common';
import { twitterCredentialsRouter } from './routes/twitter/verify-credentials';
import { twitterTimelineRouter } from './routes/twitter/home-timeline';
import { twitterTweetRouter } from './routes/twitter/tweet';
import { twitterSearchRouter } from './routes/twitter/search';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(twitterTimelineRouter);
app.use(twitterCredentialsRouter);
app.use(twitterTweetRouter);
app.use(twitterSearchRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
