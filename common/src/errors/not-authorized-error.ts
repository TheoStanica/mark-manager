import { CustomError } from './custom-error';
import { errorTypes } from './errorTypes';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Not Authorized');
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [
      { message: 'Not authorized', errorType: errorTypes.AccountNotAuthorized },
    ];
  }
}
