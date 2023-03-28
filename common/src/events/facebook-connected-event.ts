import { Subjects } from './subjects';

export interface FacebookConnectedEvent {
  subject: Subjects.FacebookConnected;

  data: {
    id: string;
    accessToken: string;
    data: {
      id: string;
      displayName: string;
      username?: string;
    };
  };
}
