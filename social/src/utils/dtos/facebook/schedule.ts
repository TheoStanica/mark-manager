export interface ScheduleFacebookPostDto {
  facebookUserId: string;
  pageId: string;
  scheduleAt: Date;
  text: string;
}

export interface UpdateScheduledFacebookPostDto {
  id: string;
  facebookUserId?: string;
  pageId?: string;
  text?: string;
  scheduleAt?: string;
}

export interface DeleteScheduledFacebookPostDto {
  id: string;
  facebookUserId: string;
  pageId: string;
}
