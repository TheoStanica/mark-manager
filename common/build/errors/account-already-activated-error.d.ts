import { CustomError } from './custom-error';
export declare class AccountAlreadyActivatedError extends CustomError {
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
