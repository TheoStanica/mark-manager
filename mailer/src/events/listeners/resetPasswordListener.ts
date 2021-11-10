import { Listener, Subjects, ResetPasswordEvent } from '@tcosmin/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queueGroupName';
import { MailerService } from '../../services/mailerService';
import Container from 'typedi';

export class PasswordResetListener extends Listener<ResetPasswordEvent> {
  subject: Subjects.ResetPassword = Subjects.ResetPassword;

  queueGroupName = queueGroupName;

  async onMessage(data: ResetPasswordEvent['data'], msg: Message) {
    const { email, resetToken } = data;

    const mailerService = Container.get(MailerService);
    await mailerService.sendResetPasswordEmail(email, resetToken);

    msg.ack();
  }
}
