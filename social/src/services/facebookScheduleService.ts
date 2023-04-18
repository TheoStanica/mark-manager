import { BadRequestError } from '@tcosmin/common';
import { Service } from 'typedi';
import { UserRepository } from '../repositories/userRepository';
import {
  DeleteScheduledFacebookPostDto,
  ScheduleFacebookPostDto,
  UpdateScheduledFacebookPostDto,
} from '../utils/dtos/facebook/schedule';
import { AgendaService } from './agendaService';

@Service()
export class FacebookScheduleService {
  constructor(
    private readonly agendaService: AgendaService,
    private readonly userRepository: UserRepository
  ) {}

  async scheduleFacebookPost(userId: string, data: ScheduleFacebookPostDto) {
    const { scheduleAt, text, facebookUserId, pageId } = data;
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

    this.agendaService.scheduleFacebookPost({
      date: scheduleAt,
      facebookUserId,
      message: text,
      userId,
      pageId,
      accessToken,
    });
  }

  async getScheduledFacebookPosts(userId: string) {
    const data = await this.agendaService.getScheduledFacebookPosts(userId);
    return data;
  }

  async updateScheduledFacebookPost(
    userId: string,
    data: UpdateScheduledFacebookPostDto
  ) {
    return await this.agendaService.updateScheduledFacebookPost(userId, data);
  }

  async deleteScheduledFacebookPost(
    userId: string,
    data: DeleteScheduledFacebookPostDto
  ) {
    await this.agendaService.deleteScheduledFacebookPost(userId, data);
  }
}
