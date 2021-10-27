import { Service } from 'typedi';
import { promisify } from 'util';
import { AdsAccountPayload } from '../utils/interfaces/twitter/adsAccountPayload';

const TwitterAdsApi = require('twitter-ads');

const consumerKey = process.env.TWITTER_CONSUMER_KEY!;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET!;

@Service()
export class TwitterAdsService {
  private client: any;
  constructor(oauthAccessToken: string, oauthAccessTokenSecret: string) {
    this.client = new TwitterAdsApi({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      access_token: oauthAccessToken,
      access_token_secret: oauthAccessTokenSecret,
      sandbox: false,
      api_version: '10',
    });
  }

  async fetchMediaAccounts(name: string) {
    const response = (await this.makeRequest('get', '/accounts', {
      q: name,
    })) as AdsAccountPayload;

    return response;
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
