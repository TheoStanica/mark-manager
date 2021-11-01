import express, { Request, Response } from 'express';
import oauth from 'oauth';
import { requireAuth } from '@tcosmin/common';
import { UserController } from '../controllers/userController';
import { TwitterConnectedPublisher } from '../events/publishers/twitter-connected-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

const consumerKey = process.env.TWITTER_CONSUMER_KEY!;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET!;
const hostURL = process.env.HOST_URL;

let consumer = new oauth.OAuth(
  'https://twitter.com/oauth/request_token',
  'https://twitter.com/oauth/access_token',
  consumerKey,
  consumerSecret,
  '1.0A',
  `https://${hostURL}/api/auth/twitter/callback`,
  'HMAC-SHA1'
);

interface SessionPayload {
  oauthRequestToken?: String;
  oauthRequestTokenSecret?: String;
  oauthAccessToken?: String;
  oauthAccessTokenSecret?: String;
  userId?: String;
}

declare global {
  namespace Express {
    interface Request {
      session: SessionPayload;
    }
  }
}

router.get('/twitter/connect', requireAuth, (req: Request, res: Response) => {
  consumer.getOAuthRequestToken(
    (err, oauthToken, oauthTokenSecret, results) => {
      if (err) {
        console.log('error getting Oauth Request Token', err);
      } else {
        req.session.oauthRequestToken = oauthToken;
        req.session.oauthRequestTokenSecret = oauthTokenSecret;
        req.session.userId = req.currentUser?.userId;
        res.send({
          requestToken: oauthToken,
          requestTokenSecret: oauthTokenSecret,
        });
      }
    }
  );
});

router.get('/twitter/callback', (req: Request, res: Response) => {
  consumer.getOAuthAccessToken(
    String(req.session.oauthRequestToken),
    String(req.session.oauthRequestTokenSecret),
    String(req.query.oauth_verifier),
    async (err, oauthAccessToken, oauthAccessTokenSecret, results) => {
      if (err) {
        res.clearCookie('connect.sid');
        res.redirect('/twitter/connect?success=false');
      } else {
        await new TwitterConnectedPublisher(natsWrapper.client).publish({
          id: String(req.session.userId),
          oauthAccessToken: oauthAccessToken,
          oauthAccessTokenSecret: oauthAccessTokenSecret,
          twitterUserId: results.user_id,
          twitterScreenName: results.screen_name,
        });
        res.clearCookie('connect.sid');
        res.redirect('/twitter/connect?success=true');
      }
    }
  );
});

export { router as twitterConnectRouter };
