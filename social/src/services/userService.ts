import { Service } from 'typedi';
import { TwitterIdDto } from '../dtos/twitterUserIdDto';
import { TwitterDoc } from '../models/twitter';
import { UserRepository } from '../repositories/userRepository';
import { handleTwitterErrors } from './handleTwitterErrors';
import { TwitterApiService } from './twitterApiService';

@Service()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async fetchConnectedTwitterAccounts(userId: string): Promise<TwitterDoc[]> {
    return await this.userRepository.fetchConnectedTwitterAccounts(userId);
  }

  async fetchTwitterCredentials(userId: string, twitterIdDto: TwitterIdDto) {
    const { twitterUserId } = twitterIdDto;

    const {
      oauthAccessToken,
      oauthAccessTokenSecret,
    } = await this.userRepository.fetchTwitterAccountTokens(
      userId,
      twitterUserId
    );

    const twitterApiService = new TwitterApiService(
      oauthAccessToken,
      oauthAccessTokenSecret
    );

    try {
      const user = await twitterApiService.fetchCredentials();
      if (user) {
        return user.data;
      }
    } catch (error) {
      handleTwitterErrors(error, twitterUserId);
    }
  }
}
