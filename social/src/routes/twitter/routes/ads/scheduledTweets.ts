import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@tcosmin/common';
import { TwitterService } from '../../../../services/twitterService';
import Container from 'typedi';
import { verifyCredentialsValidation } from '../../../../utils/validation/twitter/verifyCredentialsValidation';
import { ScheduleTweetDto } from '../../../../utils/dtos/twitter/scheduleTweetDto';
import { scheduleTweetValidation } from '../../../../utils/validation/twitter/scheduleTweetValidation';
import { UpdateScheduledTweetDto } from '../../../../utils/dtos/twitter/updateScheduledTweetDto';
import { updateScheduldTweetValidation } from '../../../../utils/validation/twitter/updateScheduledTweetValidation';
import { DeleteScheduledTweetDto } from '../../../../utils/dtos/twitter/deleteScheduledTweetDto';
import { deleteScheduledTweetValidation } from '../../../../utils/validation/twitter/deleteScheduledTweetValdiation';
import { FetchScheduledTweetsDto } from '../../../../utils/dtos/twitter/fetchScheduledTweetsDto';

const router = express.Router();

router.get(
  '/scheduled_tweets',
  requireAuth,
  verifyCredentialsValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const fetchScheduledTweetsDto = (req.query as unknown) as FetchScheduledTweetsDto;
    const userId = req.currentUser!.userId;
    const twitterService = Container.get(TwitterService);

    const tweets = await twitterService.fetchScheduledTweets(
      userId,
      fetchScheduledTweetsDto
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
    const scheduleTweetDto = req.body as ScheduleTweetDto;
    const userId = req.currentUser!.userId;
    const twitterService = Container.get(TwitterService);

    const tweet = await twitterService.scheduleTweet(userId, scheduleTweetDto);

    res.send(tweet);
  }
);

router.put(
  '/scheduled_tweets',
  requireAuth,
  updateScheduldTweetValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const updateScheduledTweetDto = req.body as UpdateScheduledTweetDto;
    const userId = req.currentUser!.userId;
    const twitterService = Container.get(TwitterService);

    const tweet = await twitterService.updateScheduledTweet(
      userId,
      updateScheduledTweetDto
    );

    res.send(tweet);
  }
);

router.delete(
  '/scheduled_tweets',
  requireAuth,
  deleteScheduledTweetValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const deleteScheduledTweetDto = (req.query as unknown) as DeleteScheduledTweetDto;
    const userId = req.currentUser!.userId;
    const twitterService = Container.get(TwitterService);

    const tweet = await twitterService.deleteScheduledTweet(
      userId,
      deleteScheduledTweetDto
    );

    res.send(tweet);
  }
);

export { router as scheduledTweetsRouter };
