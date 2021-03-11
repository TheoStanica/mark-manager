import { CustomError } from './custom-error';
import { errorTypes } from './errorTypes';
export declare class AccountNotActivatedError extends CustomError {
    userID: string;
    statusCode: number;
    constructor(userID: string);
    serializeErrors(): {
        message: string;
        userID: string;
        errorType: errorTypes;
    }[];
}
