import Agenda, { Job, JobAttributesData } from 'agenda';
import Container, { Service } from 'typedi';
import { TwitterAdsService } from './services/twitterAdsService';
import { TwitterApiService } from './services/twitterApiService';
import { TwitterService } from './services/twitterService';

export interface IScheduleTweetContract extends JobAttributesData {
  date: Date;
  twitterUserId: string;
  message: string;
  userId: string;
}

@Service()
class AgendaWrapper {
  private _agenda?: Agenda;

  async init() {
    this._agenda = new Agenda({
      db: { address: process.env.MONGO_URI! },
    });
    this._agenda.processEvery('1 second');
    await this._agenda.start();
  }

  defineJobs() {
    this.agenda.define(
      'scheduleTweet',
      {},
      async (job: Job<IScheduleTweetContract>) => {
        const twitterService = Container.get(TwitterService);
        const { data } = job.attrs;
        twitterService.tweet(data.userId, {
          status: data.message,
          twitterUserId: data.twitterUserId,
        });
      }
    );
  }

  get agenda() {
    if (!this._agenda) {
      throw new Error('Cannont access Agenda before connecting');
    }
    return this._agenda;
  }
}

export const scheduler = new AgendaWrapper();
