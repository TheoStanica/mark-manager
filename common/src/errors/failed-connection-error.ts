import { CustomError } from './custom-error';
import { errorTypes } from './errorTypes';

export class FailedConnectionError extends CustomError {
  statusCode = 503;

  constructor() {
    super('Failed to connect');
    Object.setPrototypeOf(this, FailedConnectionError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message,
        errorType: errorTypes.FailedConnectionError,
      },
    ];
  }
}
