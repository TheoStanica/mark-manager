import { Service } from 'typedi';
import {
  ScheduleTweetDto,
  UpdateScheduledTweetDto,
  DeleteScheduledTweetDto,
} from '../utils/dtos/twitter/scheduleTweetDto';
import { AgendaService } from './agendaService';

@Service()
export class TwitterScheduleService {
  constructor(private readonly agendaService: AgendaService) {}

  scheduleTweet(userId: string, data: ScheduleTweetDto) {
    const { scheduleAt, text, twitterUserId } = data;
    this.agendaService.scheduleTweet({
      date: scheduleAt,
      twitterUserId,
      message: text,
      userId,
    });
  }

  async getScheduledTweets(userId: string) {
    const data = await this.agendaService.getScheduledPosts(userId);
    return data;
  }

  async updateScheduledTweet(userId: string, data: UpdateScheduledTweetDto) {
    await this.agendaService.updateScheduledPost(userId, data);
  }

  async deleteScheduledTweet(userId: string, data: DeleteScheduledTweetDto) {
    await this.agendaService.deleteScheduledPost(userId, data);
  }
}
