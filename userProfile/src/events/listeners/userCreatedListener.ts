import { Listener, Subjects, UserCreatedEvent } from '@tcosmin/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queueGroupName';
import Container from 'typedi';
import { UserProfileService } from '../../services/userProfileService';

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;

  queueGroupName = queueGroupName;

  async onMessage(data: UserCreatedEvent['data'], msg: Message) {
    const { id, email } = data;

    const userProfileService = Container.get(UserProfileService);
    await userProfileService.createUser({
      _id: id,
      email: email,
    });

    msg.ack();
  }
}
