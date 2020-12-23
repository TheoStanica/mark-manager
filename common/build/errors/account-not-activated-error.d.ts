import { CustomError } from './custom-error';
export declare class AccountNotActivated extends CustomError {
    userID: string;
    statusCode: number;
    constructor(userID: string);
    serializeErrors(): {
        message: string;
        userID: string;
    }[];
}
