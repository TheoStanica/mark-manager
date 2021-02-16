import { Subjects } from './subjects';
export interface ResetPasswordEvent {
    subject: Subjects.ResetPassword;
    data: {
        resetToken: string;
    };
}
