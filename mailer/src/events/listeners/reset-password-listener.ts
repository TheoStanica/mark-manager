import { Listener, Subjects, ResetPasswordEvent } from '@tcosmin/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { transporter } from '../../services/transporter';

export class PasswordResetListener extends Listener<ResetPasswordEvent> {
  subject: Subjects.ResetPassword = Subjects.ResetPassword;

  queueGroupName = queueGroupName;

  async onMessage(data: ResetPasswordEvent['data'], msg: Message) {
    const { email, resetToken } = data;

    await transporter.sendResetPasswordEmail(email, resetToken);

    msg.ack();
  }
}
