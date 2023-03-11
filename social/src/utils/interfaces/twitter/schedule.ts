export type ScheduleTweetJobName = 'scheduleTweet';

export interface IScheduleTweetData {
  date: Date;
  twitterUserId: string;
  message: string;
  userId: string;
  platform: string;
}

export interface IScheduleTweetJobResponse {
  _id: string;
  name: string;
  data: IScheduleTweetData;
}
