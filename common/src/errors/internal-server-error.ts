import { CustomError } from './custom-error';

export class InternalServerError extends CustomError {
  statusCode = 500;

  constructor() {
    super('Something went wrong on our end. Try again later.');
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
