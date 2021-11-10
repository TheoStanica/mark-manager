import { Publisher, Subjects, UserCreatedEvent } from '@tcosmin/common';

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
}
