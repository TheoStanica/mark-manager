import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@tcosmin/common';
import twit from 'twit';
import { query } from 'express-validator';
import { getTwitterAccountTokens } from '../../services/getTwitterAccountTokens';
import { handleTwitterErrors } from '../../services/handleTwitterErrors';

const router = express.Router();
const consumerKey = process.env.TWITTER_CONSUMER_KEY!;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET!;

router.get(
  '/api/social/twitter/search/tweets',
  requireAuth,
  [
    query('twitterUserId')
      .notEmpty()
      .withMessage('Please provide a Twitter user ID'),
    query('search').notEmpty().withMessage('Please provide a search parameter'),
    query('maxId')
      .optional()
      .isNumeric()
      .withMessage('maxId must be a numeric value'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { search, maxId, twitterUserId } = req.query;
    const {
      oauthAccessToken,
      oauthAccessTokenSecret,
    } = await getTwitterAccountTokens(
      req.currentUser!.userId,
      String(twitterUserId)
    );
    const T = new twit({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      access_token: oauthAccessToken,
      access_token_secret: oauthAccessTokenSecret,
    });
    try {
      const tweets = await T.get('search/tweets', {
        q: String(search),
        tweet_mode: 'extended',
        max_id: maxId ? String(maxId) : undefined,
      });
      if (tweets) {
        res.send(tweets.data);
      } else {
        res.send([]);
      }
    } catch (err) {
      await handleTwitterErrors(
        err,
        req.currentUser!.userId,
        String(twitterUserId)
      );
    }
  }
);

export { router as twitterSearchRouter };
