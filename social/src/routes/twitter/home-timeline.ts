import express, { Request, Response } from 'express';
import {
  BadRequestError,
  FailedConnectionError,
  ForbiddenError,
  requireAuth,
} from '@tcosmin/common';
import twit from 'twit';
import { UserController } from '../../controllers/user-controller';

const router = express.Router();
const consumerKey = process.env.TWITTER_CONSUMER_KEY!;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET!;

router.get(
  '/api/social/twitter/statuses/home_timeline',
  requireAuth,
  async (req: Request, res: Response) => {
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
        const timeline = await T.get('statuses/home_timeline');
        if (timeline) {
          res.send(timeline.data);
        } else {
          res.send([]);
        }
      } catch (err) {
        // Tokens are invalid or revoked (Twitter side)
        throw new FailedConnectionError();
      }
    } else {
      // user didnt yet connect a twitter account
      throw new ForbiddenError();
    }
  }
);

export { router as twitterTimelineRouter };
