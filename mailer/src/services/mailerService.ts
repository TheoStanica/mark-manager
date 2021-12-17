import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { Service } from 'typedi';
import { EmailData } from '../utils/interfaces/mailData';
import { Templates } from '../utils/templates';

@Service()
export class MailerService {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      auth: {
        user: 'meet.mark.project@gmail.com',
        pass: process.env.GMAIL_PASSWORD,
      },
      secure: true,
    });
  }

  async sendActivationEmail(to: string, activationToken: string) {
    await this.sendMail({
      to,
      subject: 'Account Activation',
      html: Templates.activationTemplate(activationToken),
    });
  }

  async sendResetPasswordEmail(to: string, resetToken: string) {
    await this.sendMail({
      to,
      subject: 'Password Reset',
      html: Templates.resetPasswordTemplate(resetToken),
    });
  }

  private async sendMail(emailData: EmailData) {
    const { to, subject, html } = emailData;
    await this.transporter.sendMail({
      from: 'Project Mark',
      to,
      subject,
      html,
    });
  }
}
