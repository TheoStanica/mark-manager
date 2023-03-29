import mongoose, { ClientSession } from 'mongoose';
import { Service } from 'typedi';
import { UserDoc } from '../models/users';
// import { FacebookRepository } from '../repositories/facebookRepository';
import { TwitterRepository } from '../repositories/twitterRepository';
import { UserRepository } from '../repositories/userRepository';
import { AddFacebookAccountDto } from '../utils/dtos/facebook/create';
import { AddTokensDto } from '../utils/dtos/twitter/addTokensDto';
import {
  IConnectedAccount,
  ITwitterData,
} from '../utils/interfaces/connectedAccount';

@Service()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly twitterRepository: TwitterRepository // private readonly facebookRepository: FacebookRepository
  ) {}

  async fetchConnectedAccounts(
    userId: string
  ): Promise<Array<IConnectedAccount<ITwitterData>>> {
    // TODO update this to include facebook too
    return this.userRepository.fetchConnectedTwitterAccounts(userId);
  }

  async connectTwitterAccount(data: AddTokensDto) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const user = await this.userRepository.fetchUser(data.userId, session);
      if (!user) {
        await this.userRepository.addUserWithTokens(data, session);
      } else {
        await this.addOrUpdateTwitterAccountCredentials(user, data, session);
      }

      await session.commitTransaction();
      session.endSession();
      return true;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      return false;
    }
  }

  // async connectFacebookAccount(data: AddFacebookAccountDto) {
  //   const session = await mongoose.startSession();
  //   session.startTransaction();
  //   try {
  //     const user = await this.userRepository.fetchUser(data.id, session);
  //     if (!user) {
  //       await this.userRepository.addUser(data.id);
  //       await this.userRepository.addFacebookTokens(data, session);
  //     } else {
  //       await this.addOrUpdateFacebookAccountCredentials(user, data, session);
  //     }

  //     await session.commitTransaction();
  //     session.endSession();
  //     return true;
  //   } catch (error) {
  //     await session.abortTransaction();
  //     session.endSession();
  //     return false;
  //   }
  // }

  private async addOrUpdateTwitterAccountCredentials(
    user: UserDoc,
    data: AddTokensDto,
    session: ClientSession
  ) {
    const twitterAccount = user.twitter?.find(
      (account) => account.twitterUserId === data.twitterUserId
    );

    if (!twitterAccount) {
      const twitterCredentials =
        await this.twitterRepository.addTwitterAccountCredentials(
          data,
          session
        );
      user.twitter?.push(twitterCredentials);
      await user.save({ session });
    } else {
      await this.twitterRepository.updateTwitterAccountCredentials(
        twitterAccount.id,
        data,
        session
      );
    }
  }
  // private async addOrUpdateFacebookAccountCredentials(
  //   user: UserDoc,
  //   data: AddFacebookAccountDto,
  //   session: ClientSession
  // ) {
  //   const twitterAccount = user.facebook.find(
  //     (account) => account.data.id === data.data.id
  //   );

  //   if (!twitterAccount) {
  //     const twitterCredentials =
  //       await this.facebookRepository.addFacebookAccountCredentials(
  //         data,
  //         session
  //       );
  //     user.twitter.push(twitterCredentials);
  //     await user.save({ session });
  //   } else {
  //     await this.facebookRepository.updateFacebookAccountCredentials(
  //       twitterAccount.id,
  //       data,
  //       session
  //     );
  //   }
  // }
}
