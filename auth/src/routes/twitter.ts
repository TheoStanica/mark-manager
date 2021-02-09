import express, { Request, Response } from 'express';
import oauth from 'oauth';
import { requireAuth } from '@tcosmin/common';
import { UserController } from '../controllers/userController';

const router = express.Router();

const consumerKey = process.env.TWITTER_CONSUMER_KEY!;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET!;

let consumer = new oauth.OAuth(
  'https://twitter.com/oauth/request_token',
  'https://twitter.com/oauth/access_token',
  consumerKey,
  consumerSecret,
  '1.0A',
  `http://mark.dev/api/auth/twitter/callback`,
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

router.get(
  '/api/auth/twitter/connect',
  requireAuth,
  (req: Request, res: Response) => {
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
  }
);

console.log('something');
router.get('/api/auth/twitter/callback', (req: Request, res: Response) => {
  consumer.getOAuthAccessToken(
    String(req.session.oauthRequestToken),
    String(req.session.oauthRequestTokenSecret),
    String(req.query.oauth_verifier),
    async (err, oauthAccessToken, oauthAccessTokenSecret, results) => {
      if (err) {
        // TODO do something with this? delete session?
        console.log('ERROR IN CALLBACK', err);
        res.redirect('/dashboard');
      } else {
        await UserController.addTwitterTokens(
          String(req.session.userId),
          oauthAccessToken,
          oauthAccessTokenSecret
        );
        res.redirect('/dashboard');
      }
    }
  );
});

export { router as TwitterConnectRouter };
