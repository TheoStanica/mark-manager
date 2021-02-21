import {
  FailedConnectionError,
  ForbiddenError,
  requireAuth,
  validateRequest,
} from '@tcosmin/common';
import express, { Request, Response } from 'express';
import { UserController } from '../../controllers/user-controller';
import twit from 'twit';
import { body } from 'express-validator';

const router = express.Router();
const consumerKey = process.env.TWITTER_CONSUMER_KEY!;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET!;

router.post(
  '/api/social/twitter/statuses/update',
  requireAuth,
  [body('status').not().isEmpty().withMessage('Please provide a status')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { status } = req.body;
    const tokens = await UserController.getUserTwitterTokens(
      req.currentUser!.userId
    );

    if (tokens && tokens.oauthAccessToken && tokens.oauthAccessTokenSecret) {
      const { oauthAccessToken, oauthAccessTokenSecret } = tokens;
      const T = new twit({
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
        access_token: oauthAccessToken,
        access_token_secret: oauthAccessTokenSecret,
      });

      try {
        await T.post('statuses/update', { status: status });
        res.sendStatus(204);
      } catch (err) {
        await UserController.deleteUserTwitterTokens(req.currentUser!.userId);
        throw new FailedConnectionError();
      }
    } else {
      // no account connected;
      throw new ForbiddenError();
    }
  }
);

export { router as twitterTweetRouter };
