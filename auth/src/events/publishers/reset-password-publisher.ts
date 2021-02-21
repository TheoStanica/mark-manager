import { Publisher, Subjects, ResetPasswordEvent } from '@tcosmin/common';

export class ResetPasswordPublisher extends Publisher<ResetPasswordEvent> {
  subject: Subjects.ResetPassword = Subjects.ResetPassword;
}
