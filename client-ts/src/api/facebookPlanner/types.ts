import { IPlannedPost } from '../twitterPlanner/types';

export type FacebookPostPlatform = 'facebook';

export interface IPlannedFacebookPostData {
  platform: FacebookPostPlatform;
  userId: string;
  date: string;
  message: string;
  pageId: string;
  facebookUserId: string;
}

export interface IPlannedFacebookPost
  extends IPlannedPost<IPlannedFacebookPostData> {}

export interface IFacebookPlannerPostsResponse {
  posts: Array<IPlannedFacebookPost>;
}

export interface ICreateScheduledFacebookPostRequest {
  facebookUserId: string;
  pageId: string;
  scheduleAt: Date;
  text: string;
}

export interface IUpdateScheduledFacebookPostRequest {
  id: string;
  facebookUserId?: string;
  pageId?: string;
  text?: string;
  scheduleAt?: string;
}

export interface IDeleteScheduledFacebookPostRequest {
  id: string;
}
