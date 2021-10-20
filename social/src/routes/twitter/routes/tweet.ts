import { requireAuth, validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import twit from 'twit';
import { fetchTwitterAccountTokens } from '../../../services/getTwitterAccountTokens';
import { handleTwitterErrors } from '../../../services/handleTwitterErrors';
import { tweetValidation } from '../../../utils/validation/twitter/tweetValidation';

const router = express.Router();
const consumerKey = process.env.TWITTER_CONSUMER_KEY!;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET!;

router.post(
  '/statuses/update',
  requireAuth,
  tweetValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const { status, twitterUserId, inReplyToStatusId } = req.body;
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
      await twitterClient.post('statuses/update', {
        status: status,
        in_reply_to_status_id: inReplyToStatusId
          ? inReplyToStatusId
          : undefined,
      });
      res.sendStatus(204);
    } catch (err) {
      handleTwitterErrors(err, String(twitterUserId));
    }
  }
);

export { router as twitterTweetRouter };
