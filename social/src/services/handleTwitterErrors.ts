import { BadRequestError, FailedConnectionError } from '@tcosmin/common';
import { UserController } from '../controllers/user-controller';

export const handleTwitterErrors = async (
  err: any,
  userId: string,
  twitterAccountId: string
) => {
  if (err?.code === 89) {
    await UserController.deleteUserTwitterAccount(userId, twitterAccountId);
    throw new BadRequestError('Invalid or Expired Twitter Token');
  }
  throw new FailedConnectionError();
};
