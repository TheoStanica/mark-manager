import TwitterAPi from 'twitter-api-v2';

const consumerKey = process.env.TWITTER_CONSUMER_KEY!;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET!;

export class TwitterApiV2Service {
  private client: TwitterAPi;
  constructor(accessToken: string, accessTokenSecret: string) {
    this.client = new TwitterAPi({
      appKey: consumerKey,
      appSecret: consumerSecret,

      accessToken,
      accessSecret: accessTokenSecret,
    });
  }

  async tweet(tweet: string) {
    return await this.client.v2.tweet(tweet);
  }

  async like(twitterUserId: string, tweetId: string) {
    return await this.client.v2.like(twitterUserId, tweetId);
  }

  async unLike(twitterUserId: string, tweetId: string) {
    return await this.client.v2.unlike(twitterUserId, tweetId);
  }

  async retweet(twitterUserId: string, tweetId: string) {
    return await this.client.v2.retweet(twitterUserId, tweetId);
  }

  async unretweet(twitterUserId: string, tweetId: string) {
    return await this.client.v2.unretweet(twitterUserId, tweetId);
  }

  async homeTimeline(maxId?: string) {
    return await this.client.v2.homeTimeline({
      max_results: 20,

      pagination_token: maxId,
      'tweet.fields':
        'public_metrics,attachments,author_id,created_at,entities,id,in_reply_to_user_id,lang,possibly_sensitive,referenced_tweets,source,text,withheld,reply_settings,edit_controls',
      'user.fields':
        'created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld',
      'media.fields':
        'duration_ms,height,media_key,preview_image_url,public_metrics,type,url,width',
      expansions:
        'author_id,referenced_tweets.id,referenced_tweets.id.author_id,entities.mentions.username,in_reply_to_user_id,attachments.media_keys',
    });
  }

  async search(search: string, maxId?: string) {
    return await this.client.v2.search({
      query: search,
      next_token: maxId,

      'tweet.fields':
        'public_metrics,attachments,author_id,created_at,entities,id,in_reply_to_user_id,lang,possibly_sensitive,referenced_tweets,source,text,withheld,reply_settings,edit_controls',
      'user.fields':
        'created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld',
      'media.fields':
        'duration_ms,height,media_key,preview_image_url,public_metrics,type,url,width',
      expansions:
        'author_id,referenced_tweets.id,referenced_tweets.id.author_id,entities.mentions.username,in_reply_to_user_id,attachments.media_keys',
      max_results: 20,
    });
  }
}
