import { Service } from 'typedi';
import { ScheduleTweetDto } from '../utils/dtos/twitter/scheduleTweetDto';
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
}
