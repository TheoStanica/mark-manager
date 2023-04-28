import Agenda, { Job, JobAttributesData } from 'agenda';
import Container, { Service } from 'typedi';
import { FacebookApiService } from './services/facebookApiService';
import { TwitterAdsService } from './services/twitterAdsService';
import { TwitterApiService } from './services/twitterApiService';
import { TwitterService } from './services/twitterService';

export interface IScheduleTweetContract extends JobAttributesData {
  date: Date;
  twitterUserId: string;
  message: string;
  userId: string;
}

export interface IScheduleFacebookPostContract extends JobAttributesData {
  userId: string;
  date: Date;
  facebookUserId: string;
  accessToken: string;
  pageId: string;
  message: string;
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
    this.agenda.define(
      'scheduleFacebookPost',
      {},
      async (job: Job<IScheduleFacebookPostContract>) => {
        const fb = Container.get(FacebookApiService);
        const { data } = job.attrs;
        fb.postPageFeed(data.pageId, data.accessToken, data.message);
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
