import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { EmailTemplates } from './email-templates';

class Transporter {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      auth: {
        user: 'meet.mark.project@gmail.com',
        pass: process.env.GMAIL_PASSWORD,
      },
    });
  }

  async sendActivationEmail(emailTo: string, activationToken: string) {
    await this.transporter.sendMail({
      from: 'Project Mark',
      to: emailTo,
      subject: 'Project Mark Account Activation',
      html: EmailTemplates.activationTemplate(activationToken),
    });
  }

  async sendResetPasswordEmail(emailTo: string, resetToken: string) {
    await this.transporter.sendMail({
      from: 'Project Mark',
      to: emailTo,
      subject: 'Password Reset',
      html: EmailTemplates.resetPasswordTemplate(resetToken),
    });
  }
}

export const transporter = new Transporter();
