import { requireAuth, validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import { tweetValidation } from '../../../utils/validation/twitter/tweetValidation';
import { TweetDto } from '../../../utils/dtos/twitter/tweetDto';
import { Container } from 'typedi';
import { TwitterService } from '../../../services/twitterService';

const router = express.Router();

router.post(
  '/statuses/update',
  requireAuth,
  tweetValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const tweetDto = req.body as TweetDto;
    const userId = req.currentUser!.userId;
    const twitterService = Container.get(TwitterService);

    await twitterService.tweet(userId, tweetDto);

    res.sendStatus(204);
  }
);

export { router as twitterTweetRouter };
