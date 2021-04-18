import { CustomError } from './custom-error';
import { errorTypes } from './errorTypes';

export class TwitterInvalidTokensError extends CustomError {
  statusCode = 400;

  constructor(public accountId: string) {
    super('Invalid or expired Twitter token');
    Object.setPrototypeOf(this, TwitterInvalidTokensError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message,
        errorType: errorTypes.InvalidTokens,
        accountId: this.accountId,
      },
    ];
  }
}
