export interface ScheduleTweetDto {
  twitterUserId: string;
  scheduleAt: Date;
  text: string;
}

export interface UpdateScheduledTweetDto {
  id: string;
  twitterUserId?: string;
  text?: string;
  scheduleAt?: string;
}

export interface DeleteScheduledTweetDto {
  id: string;
}
