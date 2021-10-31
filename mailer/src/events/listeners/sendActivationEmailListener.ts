import { Listener, SendActivationEmail, Subjects } from '@tcosmin/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queueGroupName';
import Container from 'typedi';
import { MailerService } from '../../services/mailerService';

export class SendActivationEmailListener extends Listener<SendActivationEmail> {
  subject: Subjects.SendActivationEmail = Subjects.SendActivationEmail;

  queueGroupName = queueGroupName;

  async onMessage(data: SendActivationEmail['data'], msg: Message) {
    const { email, activationToken } = data;

    const mailerService = Container.get(MailerService);
    await mailerService.sendActivationEmail(email, activationToken);

    msg.ack();
  }
}
