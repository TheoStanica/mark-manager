import {
  BadRequestError,
  FailedConnectionError,
  TwitterInvalidTokensError,
  TwitterRateLimitExceededError,
} from '@tcosmin/common';

export const twitterErrorHandler = (err: any, twitterAccountId: string) => {
  console.log(err);
  switch (err?.code) {
    case 3:
      throw new BadRequestError('Invalid coordinates');
    case 34:
      throw new BadRequestError('Invalid WOEID');
    case 88:
      throw new TwitterRateLimitExceededError(twitterAccountId);
    case 89:
      throw new TwitterInvalidTokensError(twitterAccountId);
    case 139:
      throw new BadRequestError('You have already liked this Tweet');
    case 144:
      throw new BadRequestError('No status found with that ID');
    case 327:
      throw new BadRequestError('You have already retweeted this Tweet');
    default:
      throw new FailedConnectionError();
  }
};
