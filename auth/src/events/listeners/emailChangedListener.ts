import { Listener, EmailChangedEvent, Subjects } from '@tcosmin/common';
import { Message } from 'node-nats-streaming';
import Container from 'typedi';
import { AuthService } from '../../services/authService';
import { queueGroupName } from './queueGroupName';

export class EmailChangedListener extends Listener<EmailChangedEvent> {
  subject: Subjects.EmailChanged = Subjects.EmailChanged;

  queueGroupName = queueGroupName;
  async onMessage(data: EmailChangedEvent['data'], msg: Message) {
    const { userId, email } = data;

    const authService = Container.get(AuthService);
    await authService.updateEmail(userId, email);

    msg.ack();
  }
}
