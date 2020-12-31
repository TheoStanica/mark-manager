import { Listener, SendActivationEmail, Subjects } from '@tcosmin/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { transporter } from '../../services/transporter';

export class SendActivationEmailListener extends Listener<SendActivationEmail> {
  subject: Subjects.SendActivationEmail = Subjects.SendActivationEmail;

  queueGroupName = queueGroupName;

  async onMessage(data: SendActivationEmail['data'], msg: Message) {
    transporter.sendActivationEmail(data.email, data.activationToken);

    msg.ack();
  }
}
