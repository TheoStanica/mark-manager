import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@tcosmin/common';
import twit, { Twitter } from 'twit';
import { query } from 'express-validator';
import { fetchTwitterAccountTokens } from '../../services/getTwitterAccountTokens';
import { handleTwitterErrors } from '../../services/handleTwitterErrors';

const router = express.Router();
const consumerKey = process.env.TWITTER_CONSUMER_KEY!;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET!;

interface TwitterResponse {
  data: {
    statuses: any[];
    search_metadata: any;
  };
}

router.get(
  '/api/social/twitter/search/tweets/comments',
  requireAuth,
  [ 
    query('repliesToScreenName').notEmpty().withMessage("Please provide a Twitter Screen Name"),
    query('inReplyToStatusId').notEmpty().isNumeric().withMessage("Please provide a valid ID"),
    query('twitterUserId')
      .notEmpty()
      .isNumeric()
      .withMessage('Please provide a valid Twitter user ID'),
    query("sinceId").notEmpty().isNumeric().withMessage("Please provide a valid ID"),
    query('maxId')
      .optional()
      .isNumeric()
      .withMessage('maxId must be a numeric value'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      repliesToScreenName,
      inReplyToStatusId,
      twitterUserId,
      sinceId,
      maxId,
    } = req.query;

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
      const tweets = ((await twitterClient.get('search/tweets', {
        q: `to:${repliesToScreenName}`,
        tweet_mode: 'extended',
        since_id: sinceId ? String(sinceId) : undefined,
        max_id: maxId ? String(maxId) : undefined,
        count: 100,
        in_reply_to_status_id: String(inReplyToStatusId),
      })) as unknown) as TwitterResponse;
      
      const resArray = tweets.data.statuses.filter( tweet => tweet.in_reply_to_status_id_str === inReplyToStatusId);

      res.send(resArray);
    } catch (err) {
      handleTwitterErrors(err, String(twitterUserId));
    }
  }
);

export { router as twitterCommentsRouter };
