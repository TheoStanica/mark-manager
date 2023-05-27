import { Subjects } from './subjects';

export interface TwitterConnectedEvent {
  subject: Subjects.TwitterConnected;

  data: {
    id: string;
    oauthAccessToken: string;
    oauthAccessTokenSecret: string;
    twitterScreenName: string;
    twitterUserId: string;
    photos?: Array<{ value: string }>;
  };
}
