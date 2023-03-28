import { FacebookConnectedEvent, Publisher, Subjects } from '@tcosmin/common';

export class FacebookConnectedPublisher extends Publisher<FacebookConnectedEvent> {
  subject: Subjects.FacebookConnected = Subjects.FacebookConnected;
}
