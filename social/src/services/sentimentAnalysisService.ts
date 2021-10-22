import axios from 'axios';
import { Tweet } from '../utils/interfaces/twitter/tweet';

export class sentimentAnalysisService {
  static async injectSentimentIntoTweets(tweets: Tweet[]): Promise<Tweet[]> {
    await Promise.all(
      tweets.map(async (tweet) => {
        const message = tweet.full_text;
        const sentiment = await axios.post(
          'https://sentim-api.herokuapp.com/api/v1/',
          { text: message }
        );
        tweet.sentiment = sentiment.data.result.type;
      })
    );
    return tweets;
  }
}
