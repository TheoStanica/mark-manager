import { Twitter, TwitterAttrs, TwitterDoc } from '../models/twitter';
import { User, UserAttrs, UserDoc } from '../models/users';
import { TwitterController } from './twitter-controller';

export interface addTwitterTokensData {
  userID: string;
  oauthAccessToken: string;
  oauthAccessTokenSecret: string;
  twitterUserId: string;
}

export interface TwitterTokenData {
  oauthAccessToken: string;
  oauthAccessTokenSecret: string;
}

export class UserController {
  static createUser(userAttrs: UserAttrs): UserDoc {
    const user = User.build(userAttrs);
    user.save();
    return user;
  }

  static async addTwitterTokens(data: addTwitterTokensData) {
    const user = await User.findById(data.userID).populate('twitter');
    if (!user) {
      const newUser = User.build({ _id: data.userID });
      const twitterDetails = TwitterController.createTwitterAccountDetails({
        oauthAccessToken: data.oauthAccessToken,
        oauthAccessTokenSecret: data.oauthAccessTokenSecret,
        twitterUserId: data.twitterUserId,
      });
      newUser.twitter.push(twitterDetails);
      newUser.save();

      return newUser;
    } else {
      //check if these details are already in db
      let exists = false;
      user.twitter.map((twitterAccount) => {
        if (twitterAccount.twitterUserId === data.twitterUserId) {
          exists = true;
        }
      });
      if (!exists) {
        // a new twitter account to connect
        const twitterDetails = Twitter.build({
          oauthAccessToken: data.oauthAccessToken,
          oauthAccessTokenSecret: data.oauthAccessTokenSecret,
          twitterUserId: data.twitterUserId,
        });
        twitterDetails.save();
        user.twitter.push(twitterDetails);
        user.save();
        return user;
      }
      return null;
    }
  }

  static async getUserTwitterTokens(userID: string) {
    const user = await User.findById(userID);
    if (user) {
      return {
        oauthAccessToken: user.twitter.oauthAccessToken,
        oauthAccessTokenSecret: user.twitter.oauthAccessTokenSecret,
      };
    } else {
      return null;
    }
  }

  static async deleteUserTwitterAccount(
    userId: string,
    twitterAccountId: string
  ) {
    const user = await User.findById(userId).populate('twitter');
    if (!user) return null;
    user.twitter?.map(async (account) => {
      if (account.twitterUserId === twitterAccountId) {
        await TwitterController.removeTwitterAccountDetails(account.id);
        await User.updateOne(
          { _id: userId },
          {
            $pull: {
              twitter: account.id,
            },
          },
          {
            new: true,
            multi: true,
          }
        );
      }
    });
  }
}
