import { Subjects } from './subjects';
export interface EmailChangedEvent {
    subject: Subjects.EmailChanged;
    data: {
        userId: string;
        email: string;
    };
}
