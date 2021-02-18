import { CustomError } from './custom-error';
import { errorTypes } from './errorTypes';

export class TwitterInvalidTokensError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Invalid Twitter Tokens');
    Object.setPrototypeOf(this, TwitterInvalidTokensError.prototype);
  }

  serializeErrors() {
    return [
      { message: this.message, errorType: errorTypes.TwitterInvalidTokens },
    ];
  }
}
