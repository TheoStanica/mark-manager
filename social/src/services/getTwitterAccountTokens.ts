import { UserController } from '../controllers/user-controller';

export const getTwitterAccountTokens = async (
  userId: string,
  twitterUserId: string
) => {
  return await UserController.getUserTwitterAccountTokens(
    userId,
    twitterUserId
  );
};
