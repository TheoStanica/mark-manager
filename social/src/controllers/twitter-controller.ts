import { Twitter, TwitterAttrs, TwitterDoc } from '../models/twitter';

export class TwitterController {
  static createTwitterAccountDetails(twitterAttrs: TwitterAttrs): TwitterDoc {
    const twitter = Twitter.build(twitterAttrs);
    twitter.save();
    return twitter;
  }

  static async removeTwitterAccountDetails(twitterAccountDbId: string) {
    return await Twitter.deleteOne({ _id: twitterAccountDbId });
  }
}
