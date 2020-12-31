import { Listener, EmailChangedEvent, Subjects } from '@tcosmin/common';
import { Message } from 'node-nats-streaming';
import { UserController } from '../../controllers/userController';
import { queueGroupName } from './queue-group-name';

export class EmailChangedListener extends Listener<EmailChangedEvent> {
  subject: Subjects.EmailChanged = Subjects.EmailChanged;

  queueGroupName = queueGroupName;
  async onMessage(data: EmailChangedEvent['data'], msg: Message) {
    await UserController.updateUserEmail(data.userId, data.email);

    // TODO after email has been changed, send an email saying that your email has been changed, maybe in userProfile service..

    msg.ack();
  }
}
