import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@tcosmin/common';
import { TwitterService } from '../../../../services/twitterService';
import Container from 'typedi';
import { UserIdDto } from '../../../../utils/dtos/twitter/twitterUserIdDto';
import { verifyCredentialsValidation } from '../../../../utils/validation/twitter/verifyCredentialsValidation';
import { ScheduleTweetDto } from '../../../../utils/dtos/twitter/scheduleTweetDto';
import { scheduleTweetValidation } from '../../../../utils/validation/twitter/scheduleTweetValidation';

const router = express.Router();

router.get(
  '/scheduled_tweets',
  requireAuth,
  verifyCredentialsValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const twitterIdDto = (req.query as unknown) as UserIdDto;
    const userId = req.currentUser!.userId;
    const twitterService = Container.get(TwitterService);

    const tweets = await twitterService.fetchScheduledTweets(
      userId,
      twitterIdDto
    );

    res.send(tweets);
  }
);

router.post(
  '/scheduled_tweets',
  requireAuth,
  scheduleTweetValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const scheduleTweetDto = (req.query as unknown) as ScheduleTweetDto;
    const userId = req.currentUser!.userId;
    const twitterService = Container.get(TwitterService);

    const tweet = await twitterService.scheduleTweet(userId, scheduleTweetDto);

    res.send(tweet);
  }
);

export { router as scheduledTweetsRouter };
