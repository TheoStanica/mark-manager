import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@tcosmin/common';
import { searchValidation } from '../../../utils/validation/twitter/searchValidation';
import { fetchTwitterAccountTokens } from '../../../services/getTwitterAccountTokens';
import { handleTwitterErrors } from '../../../services/handleTwitterErrors';
import { SearchPayload } from '../../../utils/interfaces/twitter/searchPayload';
import axios from 'axios';
import twit from 'twit';

const router = express.Router();
const consumerKey = process.env.TWITTER_CONSUMER_KEY!;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET!;

router.get(
  '/search/tweets',
  requireAuth,
  searchValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const { search, maxId, twitterUserId } = req.query;
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
      const tweets = (await twitterClient.get('search/tweets', {
        q: String(search),
        tweet_mode: 'extended',
        max_id: maxId ? String(maxId) : undefined,
        count: 15,
      })) as SearchPayload;

      await Promise.all(
        tweets.data.statuses.map(async (tweet) => {
          const message = tweet.full_text;
          const sentiment = await axios.post(
            'https://sentim-api.herokuapp.com/api/v1/',
            { text: message }
          );
          tweet.sentiment = sentiment.data.result.type;
        })
      );

      res.send({ statuses: tweets.data.statuses } || []);
    } catch (err) {
      handleTwitterErrors(err, String(twitterUserId));
    }
  }
);

export { router as twitterSearchRouter };
