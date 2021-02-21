import { User, UserAttrs, UserDoc } from '../models/users';

export interface addTwitterTokensData {
  userID: string;
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
    const user = await User.findById(data.userID);
    if (!user) {
      const user = User.build({ _id: data.userID });
      user.twitter.oauthAccessToken = data.oauthAccessToken;
      user.twitter.oauthAccessTokenSecret = data.oauthAccessTokenSecret;
      user.save();
      return user;
    } else {
      return await User.findByIdAndUpdate(
        data.userID,
        {
          twitter: {
            oauthAccessToken: data.oauthAccessToken,
            oauthAccessTokenSecret: data.oauthAccessTokenSecret,
          },
        },
        { new: true }
      );
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

  static async deleteUserTwitterTokens(userID: string) {
    const user = await User.findByIdAndUpdate(
      userID,
      {
        twitter: {
          oauthAccessToken: null,
          oauthAccessTokenSecret: null,
        },
      },
      { new: true }
    );
    return user;
  }
}
