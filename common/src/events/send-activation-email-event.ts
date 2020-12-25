import { Subjects } from './subjects';

export interface SendActivationEmail {
  subject: Subjects.SendActivationEmail;

  data: {
    email: string;
    activationToken: string;
  };
}
