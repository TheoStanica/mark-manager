import { Subjects } from './subjects';
export interface AccessTokenRevoked {
    subject: Subjects.AccessTokenRevoked;
    data: {
        token: string;
    };
}
