import { CustomError } from './custom-error';
export declare class ForbiddenError extends CustomError {
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
