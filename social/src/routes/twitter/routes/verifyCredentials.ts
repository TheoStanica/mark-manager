import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@tcosmin/common';
import { verifyCredentialsValidation } from '../../../utils/validation/twitter/verifyCredentialsValidation';
import { fetchTwitterAccountTokens } from '../../../services/getTwitterAccountTokens';
import { handleTwitterErrors } from '../../../services/handleTwitterErrors';
import twit from 'twit';

const router = express.Router();
const consumerKey = process.env.TWITTER_CONSUMER_KEY!;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET!;

router.get(
  '/user',
  requireAuth,
  verifyCredentialsValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const { twitterUserId } = req.query;
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
      const userInfo = await twitterClient.get('account/verify_credentials');
      if (userInfo) {
        res.send(userInfo.data);
      }
    } catch (err) {
      handleTwitterErrors(err, String(twitterUserId));
    }
  }
);

export { router as twitterCredentialsRouter };
