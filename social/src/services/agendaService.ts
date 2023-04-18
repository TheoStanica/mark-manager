import { BadRequestError } from '@tcosmin/common';
import { Service } from 'typedi';
import {
  IScheduleFacebookPostContract,
  IScheduleTweetContract,
  scheduler,
} from '../agenda';
import {
  UpdateScheduledTweetDto,
  DeleteScheduledTweetDto,
} from '../utils/dtos/twitter/scheduleTweetDto';
import {
  IScheduleTweetData,
  IScheduleTweetJobResponse,
} from '../utils/interfaces/twitter/schedule';
import mongoose from 'mongoose';
import {
  IScheduleFacebookPostData,
  IScheduleFacebookPostJobResponse,
} from '../utils/interfaces/facebook/schedule';
import {
  DeleteScheduledFacebookPostDto,
  UpdateScheduledFacebookPostDto,
} from '../utils/dtos/facebook/schedule';

const SCHEDULE_TWEET = 'scheduleTweet';
const SCHEDULE_FACEBOOK_POST = 'scheduleFacebookPost';

@Service()
export class AgendaService {
  public scheduleTweet(data: IScheduleTweetContract) {
    const date = data.date;
    scheduler.agenda.schedule<IScheduleTweetContract>(date, SCHEDULE_TWEET, {
      ...data,
      platform: 'twitter',
    });
  }

  public scheduleFacebookPost(data: IScheduleFacebookPostContract) {
    const date = data.date;
    scheduler.agenda.schedule<IScheduleFacebookPostContract>(
      date,
      SCHEDULE_FACEBOOK_POST,
      {
        ...data,
        platform: 'facebook',
      }
    );
  }

  public async getScheduledPosts(
    userId: string
  ): Promise<IScheduleTweetJobResponse[]> {
    const jobs = await scheduler.agenda.jobs({
      name: SCHEDULE_TWEET,
      'data.userId': userId,
    });

    const _jobs = jobs.map((job) => {
      return {
        _id: job.attrs._id.toString(),
        name: job.attrs.name,
        data: job.attrs.data as IScheduleTweetData,
      };
    });

    return _jobs;
  }

  public async getScheduledFacebookPosts(
    userId: string
  ): Promise<IScheduleFacebookPostJobResponse[]> {
    const jobs = await scheduler.agenda.jobs({
      name: SCHEDULE_FACEBOOK_POST,
      'data.userId': userId,
    });

    const _jobs = jobs.map((job) => {
      const { accessToken, ...data } = job.attrs.data;
      return {
        _id: job.attrs._id.toString(),
        name: job.attrs.name,
        data: data as IScheduleFacebookPostData,
      };
    });

    return _jobs;
  }

  public async updateScheduledPost(
    userId: string,
    data: UpdateScheduledTweetDto
  ) {
    const jobs = await scheduler.agenda.jobs({
      _id: new mongoose.Types.ObjectId(data.id),
      name: SCHEDULE_TWEET,
      'data.userId': userId,
    });

    if (!jobs[0]) {
      throw new BadRequestError('Post does not exist');
    }

    jobs[0].attrs.data.message = data.text
      ? data.text
      : jobs[0].attrs.data.message;
    jobs[0].attrs.data.date = data.scheduleAt
      ? data.scheduleAt
      : jobs[0].attrs.data.date;
    jobs[0].attrs.data.twitterUserId = data.twitterUserId
      ? data.twitterUserId
      : jobs[0].attrs.data.twitterUserId;

    await jobs[0].save();
  }

  public async updateScheduledFacebookPost(
    userId: string,
    data: UpdateScheduledFacebookPostDto
  ) {
    const jobs = await scheduler.agenda.jobs({
      _id: new mongoose.Types.ObjectId(data.id),
      name: SCHEDULE_FACEBOOK_POST,
      'data.userId': userId,
    });

    if (!jobs[0]) {
      throw new BadRequestError('Post does not exist');
    }

    jobs[0].attrs.data.message = data.text
      ? data.text
      : jobs[0].attrs.data.message;
    jobs[0].attrs.data.date = data.scheduleAt
      ? data.scheduleAt
      : jobs[0].attrs.data.date;
    jobs[0].attrs.data.facebookUserId = data.facebookUserId
      ? data.facebookUserId
      : jobs[0].attrs.data.facebookUserId;
    jobs[0].attrs.data.pageId = data.pageId
      ? data.pageId
      : jobs[0].attrs.data.pageId;

    await jobs[0].save();
  }

  public async deleteScheduledPost(
    userId: string,
    data: DeleteScheduledTweetDto
  ) {
    const jobs = await scheduler.agenda.jobs({
      _id: new mongoose.Types.ObjectId(data.id),
      name: SCHEDULE_TWEET,
      'data.userId': userId,
      'data.twitterUserId': data.twitterUserId,
    });

    if (!jobs[0]) {
      throw new BadRequestError('Post does not exist');
    }

    await jobs[0].remove();
  }

  public async deleteScheduledFacebookPost(
    userId: string,
    data: DeleteScheduledFacebookPostDto
  ) {
    const jobs = await scheduler.agenda.jobs({
      _id: new mongoose.Types.ObjectId(data.id),
      name: SCHEDULE_FACEBOOK_POST,
      'data.userId': userId,
      'data.facebookUserId': data.facebookUserId,
      'data.pageId': data.pageId,
    });

    if (!jobs[0]) {
      throw new BadRequestError('Post does not exist');
    }

    await jobs[0].remove();
  }
}
