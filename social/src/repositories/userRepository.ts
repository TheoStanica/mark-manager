import { TwitterDoc } from '../models/twitter';
import { User, UserModel } from '../models/users';
import { Service } from 'typedi';
import { BadRequestError } from '@tcosmin/common';
import { ClientSession } from 'mongoose';
import { AddTokensDto } from '../utils/dtos/twitter/addTokensDto';
import { TwitterRepository } from './twitterRepository';
import {
  IConnectedAccount,
  ITwitterData,
} from '../utils/interfaces/connectedAccount';
import { AddFacebookAccountDto } from '../utils/dtos/facebook/create';
import { FacebookRepository } from './facebookRepository';

@Service()
export class UserRepository {
  private readonly User: UserModel;
  constructor(
    private readonly twitterRepository: TwitterRepository,
    private readonly facebookRepository: FacebookRepository
  ) {
    this.User = User;
  }

  async addUserWithTokens(data: AddTokensDto, session: ClientSession) {
    const newUser = this.User.build({ _id: data.userId });
    const twitterDetails =
      await this.twitterRepository.addTwitterAccountCredentials(data, session);
    newUser.twitter.push(twitterDetails);
    await newUser.save({ session });
  }

  async addUser(id: string) {
    const user = this.User.build({ _id: id });
    return user;
  }

  async addTwitterTokens(data: AddTokensDto, session: ClientSession) {
    const user = await this.User.findById(data.userId);
    if (!user) {
      throw new BadRequestError('');
    }
    const twitterDetails =
      await this.twitterRepository.addTwitterAccountCredentials(data, session);
    user.twitter.push(twitterDetails);

    await user.save({ session });
  }

  async addFacebookTokens(data: AddFacebookAccountDto, session: ClientSession) {
    const user = await this.User.findById(data.id);

    if (!user) {
      throw new BadRequestError('');
    }
    const twitterDetails =
      await this.facebookRepository.addFacebookAccountCredentials(
        data,
        session
      );
    user.facebook.push(twitterDetails);
    await user.save({ session });
  }

  async fetchUser(userId: string, session?: ClientSession) {
    return this.User.findById(userId)
      .populate('twitter')
      .populate('facebook')
      .session(session ? session : null);
  }

  async fetchConnectedTwitterAccounts(
    userId: string
  ): Promise<IConnectedAccount<ITwitterData>[]> {
    const user = await this.fetchUser(userId);
    const accounts = user?.twitter || [];

    return accounts?.map((account) => ({
      type: 'twitter',
      data: account,
    }));
  }

  async fetchTwitterAccountTokens(userId: string, twitterId: string) {
    const user = await this.User.findById(userId).populate('twitter');
    if (!user)
      throw new BadRequestError('You have no Twitter accounts connected');

    const foundAccount = user.twitter?.find(
      (account) => account.twitterUserId === twitterId
    );

    if (!foundAccount) {
      throw new BadRequestError(
        'This Twitter account is not connected to your account'
      );
    }

    return foundAccount;
  }

  async fetchFacebookAccountTokens(userId: string, facebookId: string) {
    const user = await this.User.findById(userId).populate('facebook');
    if (!user)
      throw new BadRequestError('You have no Facebook accounts connected');

    const foundAccount = user.facebook?.find(
      (account) => account.data.id === facebookId
    );

    if (!foundAccount) {
      throw new BadRequestError(
        'This Facebook account is not connected to your account'
      );
    }

    return foundAccount;
  }
}
