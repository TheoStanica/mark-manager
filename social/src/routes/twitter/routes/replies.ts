import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@tcosmin/common';
import { replyValidation } from '../../../utils/validation/twitter/replyValidation';
import { fetchTwitterAccountTokens } from '../../../services/getTwitterAccountTokens';
import { SearchPayload } from '../../../utils/interfaces/twitter/searchPayload';
import { handleTwitterErrors } from '../../../services/handleTwitterErrors';
import { Tweet } from '../../../utils/interfaces/twitter/tweet';
import axios from 'axios';
import twit from 'twit';

const router = express.Router();
const consumerKey = process.env.TWITTER_CONSUMER_KEY!;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET!;

router.get(
  '/search/tweets/comments',
  requireAuth,
  replyValidation,
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
      let currentSinceId = sinceId;
      let currentMaxId = maxId;
      let resArray: Tweet[] = [];

      while (resArray.length < 30) {
        const tweets = (await twitterClient.get('search/tweets', {
          q: `to:${repliesToScreenName}`,
          tweet_mode: 'extended',
          since_id: currentSinceId ? String(currentSinceId) : undefined,
          max_id: currentMaxId ? String(currentMaxId) : undefined,
          count: 100,
          in_reply_to_status_id: String(inReplyToStatusId),
        })) as SearchPayload;

        // get out of the loop when we have got all replies possible and there are no new replies
        // (or try to find replies for tweets older than 7 days - Twitter API limitation for unpaid API access)
        if (tweets.data.statuses.length === 0) break;

        const newReplies = tweets.data.statuses.filter(
          (tweet) => tweet.in_reply_to_status_id_str === inReplyToStatusId
        );
        resArray.push(...newReplies);

        // If we don't get at least 30 tweets back, it means that we got all replies already
        // or if the array of replies is empty
        if (tweets.data.statuses.length < 30 || resArray.length === 0) break;

        currentMaxId =
          tweets.data.statuses[tweets.data.statuses.length - 1].id_str;

        resArray.slice(0, 30);

        await Promise.all(
          resArray.map(async (tweet) => {
            const message = tweet.full_text;
            const sentiment = await axios.post(
              'https://sentim-api.herokuapp.com/api/v1/',
              { text: message }
            );
            tweet.sentiment = sentiment.data.result.type;
          })
        );
      }

      res.send(resArray);
    } catch (err) {
      handleTwitterErrors(err, String(twitterUserId));
    }
  }
);

export { router as twitterCommentsRouter };
