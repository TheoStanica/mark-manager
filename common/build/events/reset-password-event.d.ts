import { Subjects } from './subjects';
export interface ResetPasswordEvent {
    subject: Subjects.ResetPassword;
    data: {
        email: string;
        resetToken: string;
    };
}
