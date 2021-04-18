import { UserController } from '../controllers/user-controller';

export const fetchTwitterAccountTokens = async (
  userId: string,
  twitterUserId: string
) => {
  return await UserController.getUserTwitterAccountTokens(
    userId,
    twitterUserId
  );
};
