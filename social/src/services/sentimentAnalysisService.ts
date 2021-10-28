import axios from 'axios';
import { Tweet } from '../utils/interfaces/twitter/tweet';

const APIKEY = process.env.RAPIDAPI_KEY;

export class SentimentAnalysisService {
  static async injectSentimentIntoTweets(tweets: Tweet[]): Promise<Tweet[]> {
    try {
      await Promise.all(
        tweets.map(async (tweet) => {
          const message = tweet.full_text;
          const options = {
            method: 'POST',
            url:
              'https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1',
            headers: {
              'content-type': 'application/json',
              'x-rapidapi-host': 'text-analysis12.p.rapidapi.com',
              'x-rapidapi-key': APIKEY,
            },
            data: {
              language: 'english',
              text: message,
            },
          };

          // @ts-ignore
          const sentiment = await axios.request(options);
          tweet.sentiment = sentiment.data.sentiment;

          // const sentiment = await axios.post(
          //   'https://sentim-api.herokuapp.com/api/v1/',
          //   { text: message }
          // );
          // tweet.sentiment = sentiment.data.result.type;
        })
      );
      return tweets;
    } catch (error) {
      return tweets;
    }
  }
}
