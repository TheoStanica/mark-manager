import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@tcosmin/common';
import twit from 'twit';
import { query } from 'express-validator';
import { fetchTwitterAccountTokens } from '../../services/getTwitterAccountTokens';
import { handleTwitterErrors } from '../../services/handleTwitterErrors';
import { TwitterResponse } from '../../services/twitterStreamResponse';

const router = express.Router();
const consumerKey = process.env.TWITTER_CONSUMER_KEY!;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET!;

router.get(
  '/api/social/twitter/statuses/home_timeline',
  requireAuth,
  [
    query('maxId')
      .optional()
      .isNumeric()
      .withMessage('maxId must be a numericvalue'),
    query('twitterUserId')
      .notEmpty()
      .isNumeric()
      .withMessage('Please provide a valid Twitter user ID'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { maxId, twitterUserId } = req.query;
    const {
      oauthAccessToken,
      oauthAccessTokenSecret,
    } = await fetchTwitterAccountTokens(
      req.currentUser!.userId,
      String(twitterUserId)
    );
    const twitterClient = new twit({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      access_token: oauthAccessToken,
      access_token_secret: oauthAccessTokenSecret,
    });
    try {
      const timeline = await twitterClient.get('statuses/home_timeline', {
        tweet_mode: 'extended',
        max_id: maxId ? String(maxId) : undefined,
        count: 50,
      });
      res.send({ statuses: timeline.data } || []);
    } catch (err) {
      handleTwitterErrors(err, String(twitterUserId));
    }
  }
);

export { router as twitterTimelineRouter };
