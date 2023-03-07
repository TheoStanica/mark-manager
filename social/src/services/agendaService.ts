import { Service } from 'typedi';
import { IScheduleTweetContract, scheduler } from '../agenda';
import { TwitterScheduleService } from './twitterScheduleService';

@Service()
export class AgendaService {
  public scheduleTweet(data: IScheduleTweetContract) {
    const date = data.date;
    scheduler.agenda.schedule<IScheduleTweetContract>(date, 'scheduleTweet', {
      ...data,
      platform: 'twitter',
    });
  }

  public async getScheduledPosts() {
    const jobs = await scheduler.agenda.jobs({ name: 'scheduleTweet' });
    return jobs;
  }
}
