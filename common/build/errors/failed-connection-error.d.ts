import { CustomError } from './custom-error';
import { errorTypes } from './errorTypes';
export declare class FailedConnectionError extends CustomError {
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
        errorType: errorTypes;
    }[];
}
