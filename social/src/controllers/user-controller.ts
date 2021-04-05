import { BadRequestError, DatabaseConnectionError } from '@tcosmin/common';
import mongoose from 'mongoose';
import { Twitter } from '../models/twitter';
import { User, UserAttrs } from '../models/users';
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
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const user = await User.findById(data.userID)
        .populate('twitter')
        .session(session);
      if (!user) {
        const newUser = User.build({ _id: data.userID });
        const twitterDetails = await TwitterController.createTwitterAccountDetails(
          {
            oauthAccessToken: data.oauthAccessToken,
            oauthAccessTokenSecret: data.oauthAccessTokenSecret,
            twitterUserId: data.twitterUserId,
            twitterScreenName: data.twitterScreenName,
          },
          session
        );
        newUser.twitter.push(twitterDetails);
        await newUser.save({ session: session });

        await session.commitTransaction();
        session.endSession();
        return true;
      } else {
        //check if these details are already in db and update if it's the case
        const twitterAccount = user.twitter.find(
          (account) => account.twitterUserId === data.twitterUserId
        );
        if (!twitterAccount) {
          // new twitter account to connect
          const twitterDetails = Twitter.build({
            oauthAccessToken: data.oauthAccessToken,
            oauthAccessTokenSecret: data.oauthAccessTokenSecret,
            twitterUserId: data.twitterUserId,
            twitterScreenName: data.twitterScreenName,
          });
          await twitterDetails.save({ session: session });
          user.twitter.push(twitterDetails);
          await user.save({ session: session });
        } else {
          // update found account
          await TwitterController.updateTwitterAccountDetails(
            twitterAccount.id,
            {
              oauthAccessToken: data.oauthAccessToken,
              oauthAccessTokenSecret: data.oauthAccessTokenSecret,
              twitterUserId: data.twitterUserId,
              twitterScreenName: data.twitterScreenName,
            },
            session
          );
        }
        await session.commitTransaction();
        session.endSession();
        return true;
      }
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      return false;
    }
  }

  static async getUserAllTwitterAccounts(userId: string) {
    const user = await User.findById(userId).populate('twitter');
    return user?.twitter || [];
  }

  static async getUserTwitterAccountTokens(
    userId: string,
    twitterUserId: string
  ) {
    const user = await User.findById(userId).populate('twitter');
    if (!user)
      throw new BadRequestError('You have no Twitter accounts connected');

    const foundAccount = user.twitter?.find(
      (account) => account.twitterUserId === twitterUserId
    );

    if (!foundAccount) {
      throw new BadRequestError(
        'This Twitter account is not connected to your account'
      );
    }
    return {
      oauthAccessToken: foundAccount.oauthAccessToken,
      oauthAccessTokenSecret: foundAccount.oauthAccessTokenSecret,
    } as TwitterTokenData;
  }

  static async deleteUserTwitterAccount(
    userId: string,
    twitterAccountId: string
  ) {
    const user = await User.findById(userId).populate('twitter');
    if (!user)
      throw new BadRequestError('You have no Twitter accounts connected');

    const foundAccount = user.twitter?.find(
      (account) => account.twitterUserId === twitterAccountId
    );
    if (!foundAccount) {
      throw new BadRequestError(
        'This Twitter account is not connected to your account'
      );
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await TwitterController.removeTwitterAccountDetails(
        foundAccount.id,
        session
      );
      await User.findByIdAndUpdate(
        userId,
        {
          $pull: {
            twitter: foundAccount.id,
          },
        },
        {
          new: true,
          multi: true,
          session: session,
        }
      );
      await session.commitTransaction();
      session.endSession();
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw new DatabaseConnectionError();
    }
  }
}
