import twit from 'twit';

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

  async fetchCredentials(): Promise<twit.PromiseResponse> {
    return this.client.get('account/verify_credentials');
  }

  async tweet(status: string, inReplyToStatusId?: string) {
    return this.client.post('statuses/update', {
      status: status,
      in_reply_to_status_id: inReplyToStatusId,
    });
  }
}
