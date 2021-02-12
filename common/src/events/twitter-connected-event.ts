import { Subjects } from './subjects';

export interface TwitterConnectedEvent {
  subject: Subjects.TwitterConnected;

  data: {
    id: string;
    oauthAccessToken: string;
    oauthAccessTokenSecret: string;
  };
}
