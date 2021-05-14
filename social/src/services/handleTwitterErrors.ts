import {
  BadRequestError,
  FailedConnectionError,
  TwitterInvalidTokensError,
  TwitterRateLimitExceededError,
} from '@tcosmin/common';

export const handleTwitterErrors = (err: any, twitterAccountId: string) => {
  switch (err?.code) {
    case 88:
      throw new TwitterRateLimitExceededError(twitterAccountId);
    case 89:
      throw new TwitterInvalidTokensError(twitterAccountId);
    case 139:
      throw new BadRequestError('You have already liked this Tweet');
    case 327:
      throw new BadRequestError('You have already retweeted this Tweet');
    default:
      throw new FailedConnectionError();
  }
};
