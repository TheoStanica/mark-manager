import { BadRequestError } from '@tcosmin/common';
import { Service } from 'typedi';
import { IScheduleTweetContract, scheduler } from '../agenda';
import {
  UpdateScheduledTweetDto,
  DeleteScheduledTweetDto,
} from '../utils/dtos/twitter/scheduleTweetDto';
import {
  IScheduleTweetData,
  IScheduleTweetJobResponse,
} from '../utils/interfaces/twitter/schedule';
import mongoose from 'mongoose';

const JOB_NAME = 'scheduleTweet';

@Service()
export class AgendaService {
  public scheduleTweet(data: IScheduleTweetContract) {
    const date = data.date;
    scheduler.agenda.schedule<IScheduleTweetContract>(date, JOB_NAME, {
      ...data,
      platform: 'twitter',
    });
  }

  public async getScheduledPosts(
    userId: string
  ): Promise<IScheduleTweetJobResponse[]> {
    const jobs = await scheduler.agenda.jobs({
      name: JOB_NAME,
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

  public async updateScheduledPost(
    userId: string,
    data: UpdateScheduledTweetDto
  ) {
    const jobs = await scheduler.agenda.jobs({
      _id: new mongoose.Types.ObjectId(data.id),
      name: JOB_NAME,
      'data.userId': userId,
      'data.twitterUserId': data.twitterUserId,
    });

    if (!jobs[0]) {
      throw new BadRequestError('Schaduled post does not exist');
    }

    jobs[0].attrs.data.message = data.text
      ? data.text
      : jobs[0].attrs.data.message;
    jobs[0].attrs.data.date = data.scheduleAt
      ? data.scheduleAt
      : jobs[0].attrs.data.date;

    await jobs[0].save();
  }

  public async deleteScheduledPost(
    userId: string,
    data: DeleteScheduledTweetDto
  ) {
    const jobs = await scheduler.agenda.jobs({
      _id: new mongoose.Types.ObjectId(data.id),
      name: JOB_NAME,
      'data.userId': userId,
      'data.twitterUserId': data.twitterUserId,
    });

    if (!jobs[0]) {
      throw new BadRequestError('Schaduled post does not exist');
    }

    await jobs[0].remove();
  }
}
