import { TwitterDoc } from '../models/twitter';
import { User, UserDoc } from '../models/users';
import { Service } from 'typedi';
import { BadRequestError } from '@tcosmin/common';
import { AccessTokensData } from '../utils/interfaces/twitter/accessTokensData';
import { ClientSession } from 'mongoose';
import { AddTokensDto } from '../utils/dtos/twitter/addTokensDto';
import { TwitterRepository } from './twitterRepository';

@Service()
export class UserRepository {
  private readonly User;
  constructor(private readonly twitterRepository: TwitterRepository) {
    this.User = User;
  }

  async addUserWithTokens(data: AddTokensDto, session: ClientSession) {
    const newUser = this.User.build({ _id: data.userId });
    const twitterDetails = await this.twitterRepository.addTwitterAccountCredentials(
      data,
      session
    );
    newUser.twitter.push(twitterDetails);
    await newUser.save({ session });
  }

  async fetchUser(userId: string, session?: ClientSession) {
    const user = await this.User.findById(userId)
      .populate('twitter')
      .session(session ? session : null);
    return user;
  }

  async fetchConnectedTwitterAccounts(userId: string): Promise<TwitterDoc[]> {
    const user = await this.fetchUser(userId);
    return user?.twitter || [];
  }

  async fetchTwitterAccountTokens(
    userId: string,
    twitterId: string
  ): Promise<AccessTokensData> {
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

    return {
      oauthAccessToken: foundAccount.oauthAccessToken,
      oauthAccessTokenSecret: foundAccount.oauthAccessTokenSecret,
    } as AccessTokensData;
  }
}
