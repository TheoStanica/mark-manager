import { Publisher, Subjects, TwitterConnectedEvent } from '@tcosmin/common';

export class TwitterConnectedPublisher extends Publisher<TwitterConnectedEvent> {
  subject: Subjects.TwitterConnected = Subjects.TwitterConnected;
}
