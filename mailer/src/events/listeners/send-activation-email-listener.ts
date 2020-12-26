import { Listener, SendActivationEmail, Subjects } from '@tcosmin/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import nodemailer from 'nodemailer';

export class SendActivationEmailListener extends Listener<SendActivationEmail> {
  subject: Subjects.SendActivationEmail = Subjects.SendActivationEmail;

  queueGroupName = queueGroupName;

  async onMessage(data: SendActivationEmail['data'], msg: Message) {
    // TODO create a class for all of this?
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      auth: {
        user: 'meet.mark.project@gmail.com',
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // TODO template for html message?
    await transporter.sendMail({
      from: 'Project Mark',
      to: data.email,
      subject: 'Project Mark Account Activation',
      html: `<h1>Welcome to Project Mark!</h1><p>To activate your account, please click <a href="https://mark.dev/api/users/activation/${data.activationToken}">here</a>`,
    });

    msg.ack();
  }
}
