import { CustomError } from './custom-error';

export class AccountNotActivatedError extends CustomError {
  statusCode = 403;

  constructor(public userID: string) {
    super('Please activate your account first!');
    Object.setPrototypeOf(this, AccountNotActivatedError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message,
        userID: this.userID,
        errorType: 'accountNotActivated',
      },
    ];
  }
}
