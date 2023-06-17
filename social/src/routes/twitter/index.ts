import express from 'express';
import { scheduledTweetsRouter } from './routes/ads/scheduledTweets';
import { twitterTimelineRouter } from './routes/homeTimeline';
import { twitterLikeRouter } from './routes/like';
import { twitterCommentsRouter } from './routes/replies';
import { twitterRetweetRouter } from './routes/retweet';
import { twitterScheduleRouter } from './routes/schedule';
import { twitterSearchRouter } from './routes/search';
import { twitterTrendsRouter } from './routes/trends';
import { twitterTweetRouter } from './routes/tweet';
import { twitterCredentialsRouter } from './routes/verifyCredentials';
import { twitterV2TweetRouter } from './routes/v2/tweet';
import { twitterV2TimelineRouter } from './routes/v2/homeTimeline';
import { twitterV2LikeRouter } from './routes/v2/like';
import { twitterV2RetweetRouter } from './routes/v2/retweet';
import { twitterV2SearchRouter } from './routes/v2/search';

const twitterApi = express.Router();

twitterApi.use(twitterTimelineRouter);
twitterApi.use(twitterCredentialsRouter);
twitterApi.use(twitterTweetRouter);
twitterApi.use(twitterSearchRouter);
twitterApi.use(twitterLikeRouter);
twitterApi.use(twitterRetweetRouter);
twitterApi.use(twitterCommentsRouter);
twitterApi.use(twitterTrendsRouter);
twitterApi.use(twitterScheduleRouter);
twitterApi.use('/ads', scheduledTweetsRouter);
twitterApi.use('/v2', twitterV2TweetRouter);
twitterApi.use('/v2', twitterV2TimelineRouter);
twitterApi.use('/v2', twitterV2LikeRouter);
twitterApi.use('/v2', twitterV2RetweetRouter);
twitterApi.use('/v2', twitterV2SearchRouter);

export { twitterApi };
