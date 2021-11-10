import { Service } from 'typedi';
import { OAuth } from 'oauth';
import { Request, Response } from 'express';
import { natsWrapper } from '../natsWrapper';
import { TwitterConnectedPublisher } from '../events/publishers/twitterConnectedPublisher';

const consumerKey = process.env.TWITTER_CONSUMER_KEY!;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET!;
const hostURL = process.env.HOST_URL;

declare module 'express-session' {
  interface SessionData {
    oauthRequestToken?: String;
    oauthRequestTokenSecret?: String;
    oauthAccessToken?: String;
    oauthAccessTokenSecret?: String;
    userId?: String;
  }
}

@Service()
export class twitterOAuthService {
  private consumer: OAuth;
  constructor() {
    this.consumer = new OAuth(
      'https://twitter.com/oauth/request_token',
      'https://twitter.com/oauth/access_token',
      consumerKey,
      consumerSecret,
      '1.0A',
      `https://${hostURL}/api/auth/twitter/callback`,
      'HMAC-SHA1'
    );
  }

  async getOAuthRequestToken(req: Request, res: Response) {
    this.consumer.getOAuthRequestToken(
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

  async getOAuthAccessToken(req: Request, res: Response) {
    this.consumer.getOAuthAccessToken(
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
  }
}
