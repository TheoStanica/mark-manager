import mongoose, { ClientSession } from 'mongoose';
import { Service } from 'typedi';
import { UserDoc } from '../models/users';
import { TwitterRepository } from '../repositories/twitterRepository';
import { UserRepository } from '../repositories/userRepository';
import { AddTokensDto } from '../utils/dtos/twitter/addTokensDto';

@Service()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly twitterRepository: TwitterRepository
  ) {}

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

  private async addOrUpdateTwitterAccountCredentials(
    user: UserDoc,
    data: AddTokensDto,
    session: ClientSession
  ) {
    const twitterAccount = user.twitter.find(
      (account) => account.twitterUserId === data.twitterUserId
    );

    if (!twitterAccount) {
      const twitterCredentials = await this.twitterRepository.addTwitterAccountCredentials(
        data,
        session
      );
      user.twitter.push(twitterCredentials);
      await user.save({ session });
    } else {
      await this.twitterRepository.updateTwitterAccountCredentials(
        twitterAccount.id,
        data,
        session
      );
    }
  }
}
