import {
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
    default:
      throw new FailedConnectionError();
  }
};
