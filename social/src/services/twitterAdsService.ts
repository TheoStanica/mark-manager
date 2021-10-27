import { BadRequestError } from '@tcosmin/common';
import { Service } from 'typedi';
import { promisify } from 'util';
import { ScheduleTweetDto } from '../utils/dtos/twitter/scheduleTweetDto';
import { AdsAccountPayload } from '../utils/interfaces/twitter/adsAccountPayload';

const TwitterAdsApi = require('twitter-ads');

const consumerKey = process.env.TWITTER_CONSUMER_KEY!;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET!;

@Service()
export class TwitterAdsService {
  private client: any;
  private _adsId: string | undefined;

  private get adsId() {
    if (!this._adsId) {
      throw new BadRequestError('You do not have an active media account');
    }
    return this._adsId;
  }

  constructor(
    oauthAccessToken: string,
    oauthAccessTokenSecret: string,
    adsId: string | undefined
  ) {
    this.client = new TwitterAdsApi({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      access_token: oauthAccessToken,
      access_token_secret: oauthAccessTokenSecret,
      sandbox: false,
      api_version: '10',
    });
    this._adsId = adsId;
  }

  async fetchMediaAccounts(name: string) {
    const response = (await this.makeRequest('get', '/accounts', {
      q: name,
    })) as AdsAccountPayload;

    return response;
  }

  async fetchScheduledTweets() {
    return await this.makeRequest(
      'get',
      `/accounts/${this.adsId}/scheduled_tweets`
    );
  }

  async createScheduledTweet(scheduleTweetDto: ScheduleTweetDto) {
    const { scheduleAt, text, twitterUserId } = scheduleTweetDto;
    return await this.makeRequest(
      'post',
      `/accounts/${this.adsId}/scheduled_tweets`,
      {
        as_user_id: twitterUserId,
        scheduled_at: scheduleAt,
        text: text,
        nullcast: false,
      }
    );
  }

  private async makeRequest(
    type: string,
    url: string,
    params?: Object,
    _body?: Object
  ) {
    const promisifiedRequest = promisify(this.client[type]).bind(this.client);
    if (type.toLowerCase() === 'post' || type.toLowerCase() === 'put') {
      const { body } = await promisifiedRequest(url, params, _body);
      return JSON.parse(body);
    } else {
      const { body } = await promisifiedRequest(url, params);
      return JSON.parse(body);
    }
  }
}
