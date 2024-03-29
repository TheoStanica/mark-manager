import { ClientSession } from 'mongoose';
import { Service } from 'typedi';
import { Twitter, TwitterModel } from '../models/twitter';
import { AddTokensDto } from '../utils/dtos/twitter/addTokensDto';

@Service()
export class TwitterRepository {
  private readonly Twitter: TwitterModel;
  constructor() {
    this.Twitter = Twitter;
  }

  async addTwitterAccountCredentials(
    data: AddTokensDto,
    session?: ClientSession
  ) {
    const twitter = this.Twitter.build({
      oauthAccessToken: data.oauthAccessToken,
      oauthAccessTokenSecret: data.oauthAccessTokenSecret,
      twitterScreenName: data.twitterScreenName,
      twitterUserId: data.twitterUserId,
    });
    await twitter.save({ session });
    return twitter;
  }

  async updateTwitterAccountCredentials(
    twitterAccountMongoId: string,
    data: AddTokensDto,
    session?: ClientSession
  ) {
    return this.Twitter.findByIdAndUpdate(
      twitterAccountMongoId,
      {
        oauthAccessToken: data.oauthAccessToken,
        oauthAccessTokenSecret: data.oauthAccessTokenSecret,
        twitterScreenName: data.twitterScreenName,
        twitterUserId: data.twitterUserId,
      },
      { new: true, session }
    );
  }

  async addMediaAccount(twitterAccountMongoId: string, adsId: string) {
    return this.Twitter.findByIdAndUpdate(
      twitterAccountMongoId,
      {
        $set: { adsId, hasAdsAccount: true },
      },
      { new: true }
    );
  }
}
