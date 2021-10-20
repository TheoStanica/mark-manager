import { requireAuth, validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import { tweetValidation } from '../../../utils/validation/twitter/tweetValidation';
import { TweetDto } from '../../../utils/dtos/tweetDto';
import { Container } from 'typedi';
import { UserService } from '../../../services/userService';

const router = express.Router();

router.post(
  '/statuses/update',
  requireAuth,
  tweetValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const tweetDto = req.body as TweetDto;
    const userId = req.currentUser!.userId;
    const userService = Container.get(UserService);

    await userService.tweet(userId, tweetDto);

    res.sendStatus(204);
  }
);

export { router as twitterTweetRouter };
