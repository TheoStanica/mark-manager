import { Service } from 'typedi';
import { UserRepository } from '../repositories/userRepository';
import { FacebookAccountPagesPayload } from '../utils/interfaces/facebook/accountPagesPayload';
import { FacebookApiService } from './facebookApiService';

@Service()
export class FacebookService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly facebookApiService: FacebookApiService
  ) {}

  public async me(userId: string, facebookAccId: string) {
    const user = await this.userRepository.fetchFacebookAccountTokens(
      userId,
      facebookAccId
    );
    return await this.facebookApiService.me(facebookAccId, user.accessToken);
  }

  public async pages(userId: string, facebookAccId: string) {
    const user = await this.userRepository.fetchFacebookAccountTokens(
      userId,
      facebookAccId
    );
    return (await this.facebookApiService.accounts(
      facebookAccId,
      user.accessToken
    )) as FacebookAccountPagesPayload;
  }
}
