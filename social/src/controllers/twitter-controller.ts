import { Twitter, TwitterAttrs } from '../models/twitter';
import { ClientSession } from 'mongoose';

export class TwitterController {
  static async createTwitterAccountDetails(
    twitterAttrs: TwitterAttrs,
    session?: ClientSession
  ) {
    const twitter = Twitter.build(twitterAttrs);
    await twitter.save({ session: session });
    return twitter;
  }

  static async updateTwitterAccountDetails(
    twitterAccountDbId: string,
    data: TwitterAttrs,
    session?: ClientSession
  ) {
    return await Twitter.findByIdAndUpdate(
      twitterAccountDbId,
      {
        oauthAccessToken: data.oauthAccessToken,
        oauthAccessTokenSecret: data.oauthAccessTokenSecret,
        twitterScreenName: data.twitterScreenName,
      },
      { new: true, session: session }
    );
  }

  static async removeTwitterAccountDetails(
    twitterAccountDbId: string,
    session?: ClientSession
  ) {
    return await Twitter.deleteOne(
      { _id: twitterAccountDbId },
      { session: session ? session : undefined }
    );
  }
}
