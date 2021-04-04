import { BadRequestError } from '@tcosmin/common';
import { UserController } from '../controllers/user-controller';

export const getTwitterAccountTokens = async (
  userId: string,
  twitterUserId: string
) => {
  const data = await UserController.getUserTwitterAccountTokens(
    userId,
    twitterUserId
  );
  if (!data) {
    throw new BadRequestError('Please provide a valid userId');
  }
  return data;
};
