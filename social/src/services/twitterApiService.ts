import twit from 'twit';
import { SearchPayload } from '../utils/interfaces/twitter/searchPayload';

const consumerKey = process.env.TWITTER_CONSUMER_KEY!;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET!;

export class TwitterApiService {
  private client: twit;
  constructor(oauthAccessToken: string, oauthAccessTokenSecret: string) {
    this.client = new twit({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      access_token: oauthAccessToken,
      access_token_secret: oauthAccessTokenSecret,
    });
  }

  async fetchCredentials() {
    return this.client.get('account/verify_credentials');
  }

  async tweet(status: string, inReplyToStatusId?: string) {
    return this.client.post('statuses/update', {
      status: status,
      in_reply_to_status_id: inReplyToStatusId,
    });
  }

  async retweet(tweetId: string) {
    return this.client.post(`statuses/retweet/${tweetId}`);
  }

  async unretweet(tweetId: string) {
    return this.client.post(`statuses/unretweet/${tweetId}`);
  }

  async like(tweetId: string) {
    return this.client.post('favorites/create', { id: tweetId });
  }

  async unlike(tweetId: string) {
    return this.client.post('favorites/destroy', { id: tweetId });
  }

  async search(search: string, maxId?: string) {
    return (this.client.get('search/tweets', {
      q: search,
      tweet_mode: 'extended',
      max_id: maxId,
      count: 15,
    }) as unknown) as SearchPayload;
  }
}
