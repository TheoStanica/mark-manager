import { CustomError } from './custom-error';
import { errorTypes } from './errorTypes';

export class TwitterRateLimitExceededError extends CustomError {
  statusCode = 429;

  constructor(public accountId: string) {
    super('Twitter Rate limit exceeded');
    Object.setPrototypeOf(this, TwitterRateLimitExceededError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message,
        errorType: errorTypes.TwitterRateLimitExceeded,
        accountId: this.accountId,
      },
    ];
  }
}
