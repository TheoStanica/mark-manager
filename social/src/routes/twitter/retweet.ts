import { requireAuth, validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import twit from 'twit';
import { body } from 'express-validator';
import { fetchTwitterAccountTokens } from '../../services/getTwitterAccountTokens';
import { handleTwitterErrors } from '../../services/handleTwitterErrors';

const router = express.Router();
const consumerKey = process.env.TWITTER_CONSUMER_KEY!;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET!;

router.post(
  '/api/social/twitter/statuses/retweet',
  requireAuth,
  [
    body('tweetId')
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage('Please provide a Tweet ID'),
    body('twitterUserId')
      .notEmpty()
      .isNumeric()
      .withMessage('Please provide a valid Twitter user ID'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { tweetId, twitterUserId } = req.body;
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
      await twitterClient.post(`statuses/retweet/${tweetId}`);
      res.sendStatus(204);
    } catch (err) {
      handleTwitterErrors(err, String(twitterUserId));
    }
  }
);
router.post(
  '/api/social/twitter/statuses/unretweet',
  requireAuth,
  [
    body('tweetId')
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage('Please provide a Tweet ID'),
    body('twitterUserId')
      .notEmpty()
      .isNumeric()
      .withMessage('Please provide a valid Twitter user ID'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { tweetId, twitterUserId } = req.body;
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
      await twitterClient.post(`statuses/unretweet/${tweetId}`);
      res.sendStatus(204);
    } catch (err) {
      handleTwitterErrors(err, String(twitterUserId));
    }
  }
);

export { router as twitterRetweetRouter };
