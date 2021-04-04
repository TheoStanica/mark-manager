import { CustomError } from './custom-error';
import { errorTypes } from './errorTypes';
export declare class TwitterInvalidTokensError extends CustomError {
    accountId: string;
    statusCode: number;
    constructor(accountId: string);
    serializeErrors(): {
        message: string;
        errorType: errorTypes;
        accountId: string;
    }[];
}
