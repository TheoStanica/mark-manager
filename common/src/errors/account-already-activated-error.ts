import { CustomError } from './custom-error';

export class AccountAlreadyActivatedError extends CustomError {
  statusCode = 410;

  constructor() {
    super('Account already activated.');
    Object.setPrototypeOf(this, AccountAlreadyActivatedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
