export interface UpdateScheduledTweetDto {
  scheduledTweetId: string;
  twitterUserId: string;
  scheduleAt: Date;
  text: string;
}
