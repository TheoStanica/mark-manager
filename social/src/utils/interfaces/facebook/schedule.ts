export type ScheduleFacebookPostJobName = 'scheduleFacebookPost';

export interface IScheduleFacebookPostData {
  userId: string;
  date: Date;
  facebookUserId: string;
  accessToken?: string;
  pageId: string;
  message: string;
  platform: string;
}

export interface IScheduleFacebookPostJobResponse {
  _id: string;
  name: string;
  data: IScheduleFacebookPostData;
}
