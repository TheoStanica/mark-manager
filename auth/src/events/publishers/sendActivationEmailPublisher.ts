import { Publisher, Subjects, SendActivationEmail } from '@tcosmin/common';

export class SendActivationEmailPublisher extends Publisher<SendActivationEmail> {
  subject: Subjects.SendActivationEmail = Subjects.SendActivationEmail;
}
