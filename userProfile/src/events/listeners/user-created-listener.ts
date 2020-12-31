import { Listener, Subjects, UserCreatedEvent } from '@tcosmin/common';
import { Message } from 'node-nats-streaming';
import { UserProfile } from '../../models/userprofile';
import { queueGroupName } from './queue-group-name';
import { UserProfileController } from '../../controllers/userprofile-controller';

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;

  queueGroupName = queueGroupName;

  async onMessage(data: UserCreatedEvent['data'], msg: Message) {
    const { id, email } = data;

    UserProfileController.createUser({
      _id: id,
      email: email,
    });

    msg.ack();
  }
}
