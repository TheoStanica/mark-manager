import { TwitterDoc } from '../models/twitter';
import { User } from '../models/users';
import { Service } from 'typedi';
import { BadRequestError } from '@tcosmin/common';
import { AccessTokensData } from '../utils/interfaces/twitter/accessTokensData';

@Service()
export class UserRepository {
  private readonly User;
  constructor() {
    this.User = User;
  }

  async fetchConnectedTwitterAccounts(userId: string): Promise<TwitterDoc[]> {
    const user = await this.User.findById(userId).populate('twitter');
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
