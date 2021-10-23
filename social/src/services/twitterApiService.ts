import twit from 'twit';
import { RepliesDto } from '../utils/dtos/twitter/repliesDto';
import { HomeTimelinePayload } from '../utils/interfaces/twitter/homeTimelinePayload';
import { SearchPayload } from '../utils/interfaces/twitter/searchPayload';
import { TrendsPayload } from '../utils/interfaces/twitter/trendsPayload';
import { Tweet } from '../utils/interfaces/twitter/tweet';

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
    return (await this.client.get('search/tweets', {
      q: encodeURIComponent(search),
      tweet_mode: 'extended',
      max_id: maxId,
      count: 15,
    })) as SearchPayload;
  }

  async trends(woeid?: string) {
    return ((await this.client.get('trends/place', {
      id: woeid ? woeid : '1',
    })) as unknown) as TrendsPayload;
  }

  async homeTimeline(maxId?: string) {
    return (await this.client.get('statuses/home_timeline', {
      tweet_mode: 'extended',
      max_id: maxId,
      count: 30,
    })) as HomeTimelinePayload;
  }

  async replies(repliesDto: RepliesDto) {
    const {
      repliesToScreenName,
      inReplyToStatusId,
      sinceId,
      maxId,
    } = repliesDto;

    let currentSinceId = sinceId;
    let currentMaxId = maxId;
    let resArray: Tweet[] = [];

    while (resArray.length < 30) {
      const tweets = (await this.client.get('search/tweets', {
        tweet_mode: 'extended',
        q: `to:${repliesToScreenName}`,
        in_reply_to_status_id: inReplyToStatusId,
        since_id: currentSinceId,
        max_id: currentMaxId,
        count: 100,
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
    }

    return resArray.slice(0, 30);
  }
}
