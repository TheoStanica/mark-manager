import express, { Request, Response } from 'express';
import {
  BadRequestError,
  FailedConnectionError,
  requireAuth,
  validateRequest,
} from '@tcosmin/common';
import twit from 'twit';
import { UserController } from '../../controllers/user-controller';
import { query } from 'express-validator';
import { getTwitterAccountTokens } from '../../services/getTwitterAccountTokens';

const router = express.Router();
const consumerKey = process.env.TWITTER_CONSUMER_KEY!;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET!;

router.get(
  '/api/social/twitter/user',
  requireAuth,
  [
    query('twitterUserId')
      .notEmpty()
      .withMessage('Please provide a Twitter user ID'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { twitterUserId } = req.query;
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
      const userInfo = await T.get('account/verify_credentials');
      if (userInfo) {
        res.send(userInfo.data);
      }
    } catch (err) {
      // Tokens are invalid or revoked (Twitter side)
      throw new FailedConnectionError();
    }
  }
);

export { router as twitterCredentialsRouter };
