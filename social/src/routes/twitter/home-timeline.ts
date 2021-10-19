import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@tcosmin/common';
import { query } from 'express-validator';
import { TwitterHomeTimelinePayload } from '../../utils/interfaces/twitterHomeTimelinePayload';
import { fetchTwitterAccountTokens } from '../../services/getTwitterAccountTokens';
import { handleTwitterErrors } from '../../services/handleTwitterErrors';
import axios from 'axios';
import twit from 'twit';

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
      const statuses = (await twitterClient.get('statuses/home_timeline', {
        tweet_mode: 'extended',
        max_id: maxId ? String(maxId) : undefined,
        count: 30,
      })) as TwitterHomeTimelinePayload;

      await Promise.all(
        statuses.data.map(async (tweet) => {
          const message = tweet.full_text;
          const sentiment = await axios.post(
            'https://sentim-api.herokuapp.com/api/v1/',
            { text: message }
          );
          tweet.sentiment = sentiment.data.result.type;
        })
      );

      res.send({ statuses: statuses.data } || []);
    } catch (err) {
      handleTwitterErrors(err, String(twitterUserId));
    }
  }
);

export { router as twitterTimelineRouter };
