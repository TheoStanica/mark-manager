import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@tcosmin/common';
import { searchValidation } from '../../../utils/validation/twitter/searchValidation';
import Container from 'typedi';
import { scheduleTweetValidation } from '../../../utils/validation/twitter/scheduleTweetValidation';
import { ScheduleTweetDto } from '../../../utils/dtos/twitter/scheduleTweetDto';
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

export { router as twitterScheduleRouter };
