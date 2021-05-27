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
  '/api/social/twitter/statuses/update',
  requireAuth,
  [
    body('status').not().isEmpty().withMessage('Please provide a status'),
    body('twitterUserId')
      .notEmpty()
      .isNumeric()
      .withMessage('Please provide a valid Twitter user ID'),
    body('inReplyToStatusId')
      .optional()
      .isNumeric()
      .withMessage('Please provide a valid inReplyToStatusId'),
  ],
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
