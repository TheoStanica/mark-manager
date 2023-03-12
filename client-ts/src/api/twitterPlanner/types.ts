export type PlannedPostTypes = 'scheduleTweet';

export interface ITwitterPlannerPostsResponse {
  tweets: Array<IPlannedTwitterPost>;
}

export interface IPlannedPost<T> {
  _id: string;
  name: PlannedPostTypes;
  data: T;
}

export type TwitterPostPlatform = 'twitter';
export interface IPlannedTwitterPostData {
  twitterUserId: string;
  platform: TwitterPostPlatform;
  userId: string;
  date: string;
  message: string;
}

export interface IPlannedTwitterPost
  extends IPlannedPost<IPlannedTwitterPostData> {}

export interface ICreateScheduledTwitterPostRequest {
  twitterUserId: string;
  scheduleAt: Date;
  text: string;
}

export interface IUpdateScheduledTweetPostRequest {
  id: string;
  twitterUserId?: string;
  text?: string;
  scheduleAt?: string;
}

export interface IDeleteScheduledTweetPostRequest {
  id: string;
  twitterUserId: string;
}
