import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@tcosmin/common';
import { searchValidation } from '../../../utils/validation/twitter/searchValidation';
import Container from 'typedi';
import {
  scheduleTweetValidation,
  updateScheduldTweetValidation,
  deleteScheduldTweetValidation,
} from '../../../utils/validation/twitter/scheduleTweetValidation';
import {
  ScheduleTweetDto,
  UpdateScheduledTweetDto,
  DeleteScheduledTweetDto,
} from '../../../utils/dtos/twitter/scheduleTweetDto';
import { TwitterScheduleService } from '../../../services/twitterScheduleService';

const router = express.Router();

router.post(
  '/schedule',
  requireAuth,
  scheduleTweetValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const data = req.body as unknown as ScheduleTweetDto;
    const userId = req.currentUser!.userId;
    const twitterScheduleService = Container.get(TwitterScheduleService);
    twitterScheduleService.scheduleTweet(userId, data);

    res.sendStatus(201);
  }
);

router.get(
  '/schedule',
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const userId = req.currentUser!.userId;
    const twitterScheduleService = Container.get(TwitterScheduleService);
    const data = await twitterScheduleService.getScheduledTweets(userId);

    res.send({ tweets: data });
  }
);

router.put(
  '/schedule',
  requireAuth,
  updateScheduldTweetValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const userId = req.currentUser!.userId;
    const data = req.body as unknown as UpdateScheduledTweetDto;
    const twitterScheduleService = Container.get(TwitterScheduleService);
    await twitterScheduleService.updateScheduledTweet(userId, data);

    res.sendStatus(204);
  }
);

router.delete(
  '/schedule',
  requireAuth,
  deleteScheduldTweetValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const userId = req.currentUser!.userId;
    const data = req.body as unknown as DeleteScheduledTweetDto;
    const twitterScheduleService = Container.get(TwitterScheduleService);
    await twitterScheduleService.deleteScheduledTweet(userId, data);

    res.sendStatus(204);
  }
);

export { router as twitterScheduleRouter };
