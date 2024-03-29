import { BadRequestError } from '@tcosmin/common';
import { Service } from 'typedi';
import { FacebookRepository } from '../repositories/facebookRepository';
import { UserRepository } from '../repositories/userRepository';
import { FacebookFeedDto } from '../utils/dtos/facebook/feed';
import {
  FacebookAddPageDto,
  FacebookPostOnPageDto,
} from '../utils/dtos/facebook/pages';
import { FacebookAccountPagesPayload } from '../utils/interfaces/facebook/accountPagesPayload';
import { FacebookApiService } from './facebookApiService';

@Service()
export class FacebookService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly facebookRepository: FacebookRepository,
    private readonly facebookApiService: FacebookApiService
  ) {}

  public async me(userId: string, facebookAccId: string) {
    const acc = await this.userRepository.fetchFacebookAccountTokens(
      userId,
      facebookAccId
    );
    return await this.facebookApiService.me(facebookAccId, acc.accessToken);
  }

  public async pages(userId: string, facebookAccId: string) {
    const acc = await this.userRepository.fetchFacebookAccountTokens(
      userId,
      facebookAccId
    );
    return (await this.facebookApiService.accounts(
      facebookAccId,
      acc.accessToken
    )) as FacebookAccountPagesPayload;
  }

  public async addPage(userId: string, data: FacebookAddPageDto) {
    const acc = await this.userRepository.fetchFacebookAccountTokens(
      userId,
      data.facebookUserId
    );

    const account = await this.facebookRepository.addPageCredentials(acc.id, {
      access_token: data.access_token,
      category: data.category,
      id: data.id,
      name: data.name,
    });
    return account;
  }

  public async fetchPageFeed(userId: string, data: FacebookFeedDto) {
    const acc = await this.userRepository.fetchFacebookAccountTokens(
      userId,
      data.facebookUserId
    );

    const accessToken = acc.pages.find(
      (pg) => pg.id === data.pageId
    )?.access_token;

    if (!accessToken) {
      throw new BadRequestError('Page not found');
    }

    return await this.facebookApiService.pageFeed(
      data.pageId,
      accessToken,
      data.before,
      data.after
    );
  }

  public async postPageFeed(userId: string, data: FacebookPostOnPageDto) {
    const acc = await this.userRepository.fetchFacebookAccountTokens(
      userId,
      data.facebookUserId
    );

    const accessToken = acc.pages.find(
      (pg) => pg.id === data.pageId
    )?.access_token;

    if (!accessToken) {
      throw new BadRequestError('Page not found');
    }

    return await this.facebookApiService.postPageFeed(
      data.pageId,
      accessToken,
      data.message
    );
  }
}
