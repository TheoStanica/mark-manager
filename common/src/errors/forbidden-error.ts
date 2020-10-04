import { CustomError } from './custom-error';

export class ForbiddenError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Forbidden');
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Forbidden' }];
  }
}
