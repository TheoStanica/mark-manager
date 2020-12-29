import { Publisher, Subjects, EmailChangedEvent } from '@tcosmin/common';

export class EmailChangedPublisher extends Publisher<EmailChangedEvent> {
  subject: Subjects.EmailChanged = Subjects.EmailChanged;
}
