import express from 'express';
import { twitterAccountsRouter } from './routes/accounts';
import { twitterTimelineRouter } from './routes/homeTimeline';
import { twitterLikeRouter } from './routes/like';
import { twitterCommentsRouter } from './routes/replies';
import { twitterRetweetRouter } from './routes/retweet';
import { twitterSearchRouter } from './routes/search';
import { twitterTrendsRouter } from './routes/trends';
import { twitterTweetRouter } from './routes/tweet';
import { twitterCredentialsRouter } from './routes/verifyCredentials';

const twitterApi = express.Router();

twitterApi.use(twitterTimelineRouter);
twitterApi.use(twitterCredentialsRouter);
twitterApi.use(twitterTweetRouter);
twitterApi.use(twitterSearchRouter);
twitterApi.use(twitterAccountsRouter);
twitterApi.use(twitterLikeRouter);
twitterApi.use(twitterRetweetRouter);
twitterApi.use(twitterCommentsRouter);
twitterApi.use(twitterTrendsRouter);

export { twitterApi };
