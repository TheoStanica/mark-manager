import { Twitter, TwitterAttrs } from '../models/twitter';

export class TwitterController {
  static async createTwitterAccountDetails(twitterAttrs: TwitterAttrs) {
    const twitter = Twitter.build(twitterAttrs);
    await twitter.save();
    return twitter;
  }

  static async updateTwitterAccountDetails(
    twitterAccountDbId: string,
    data: TwitterAttrs
  ) {
    return await Twitter.findByIdAndUpdate(
      twitterAccountDbId,
      {
        oauthAccessToken: data.oauthAccessToken,
        oauthAccessTokenSecret: data.oauthAccessTokenSecret,
        twitterScreenName: data.twitterScreenName,
      },
      { new: true }
    );
  }

  static async removeTwitterAccountDetails(twitterAccountDbId: string) {
    return await Twitter.deleteOne({ _id: twitterAccountDbId });
  }
}
