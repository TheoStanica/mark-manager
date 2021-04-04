import { Twitter, TwitterAttrs, TwitterDoc } from '../models/twitter';
import { User, UserAttrs, UserDoc } from '../models/users';
import { TwitterController } from './twitter-controller';

export interface addTwitterTokensData {
  userID: string;
  oauthAccessToken: string;
  oauthAccessTokenSecret: string;
  twitterScreenName: string;
  twitterUserId: string;
}

export interface TwitterTokenData {
  oauthAccessToken: string;
  oauthAccessTokenSecret: string;
}

export class UserController {
  static async createUser(userAttrs: UserAttrs) {
    const user = User.build(userAttrs);
    await user.save();
    return user;
  }

  static async addTwitterTokens(data: addTwitterTokensData) {
    const user = await User.findById(data.userID).populate('twitter');
    if (!user) {
      const newUser = User.build({ _id: data.userID });
      const twitterDetails = await TwitterController.createTwitterAccountDetails(
        {
          oauthAccessToken: data.oauthAccessToken,
          oauthAccessTokenSecret: data.oauthAccessTokenSecret,
          twitterUserId: data.twitterUserId,
          twitterScreenName: data.twitterScreenName,
        }
      );
      newUser.twitter.push(twitterDetails);
      await newUser.save();

      return newUser;
    } else {
      //check if these details are already in db and update if it's the case
      let exists = false;
      user.twitter.map(async (twitterAccount) => {
        if (twitterAccount.twitterUserId === data.twitterUserId) {
          exists = true;
          await TwitterController.updateTwitterAccountDetails(
            twitterAccount.id,
            {
              oauthAccessToken: data.oauthAccessToken,
              oauthAccessTokenSecret: data.oauthAccessTokenSecret,
              twitterUserId: data.twitterUserId,
              twitterScreenName: data.twitterScreenName,
            }
          );
        }
      });
      if (!exists) {
        // a new twitter account to connect
        const twitterDetails = Twitter.build({
          oauthAccessToken: data.oauthAccessToken,
          oauthAccessTokenSecret: data.oauthAccessTokenSecret,
          twitterUserId: data.twitterUserId,
          twitterScreenName: data.twitterScreenName,
        });
        await twitterDetails.save();
        user.twitter.push(twitterDetails);
        await user.save();
        return user;
      }
      return null;
    }
  }

  static async getUserAllTwitterAccounts(userId: string) {
    const user = await User.findById(userId).populate('twitter');
    return user ? user : [];
  }

  static async getUserTwitterAccountTokens(
    userId: string,
    twitterUserId: string
  ) {
    const user = await User.findById(userId).populate('twitter');
    if (!user) return null;

    let tokens: TwitterTokenData = {
      oauthAccessToken: '',
      oauthAccessTokenSecret: '',
    };

    user.twitter?.map((account) => {
      if (account.twitterUserId === twitterUserId) {
        tokens.oauthAccessToken = account.oauthAccessToken;
        tokens.oauthAccessTokenSecret = account.oauthAccessTokenSecret;
      }
    });

    if (tokens.oauthAccessToken === '' && tokens.oauthAccessTokenSecret === '')
      return null;
    return tokens;
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
