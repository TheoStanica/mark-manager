import { requireAuth, validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import { tweetValidation } from '../../../utils/validation/twitter/tweetValidation';
import { TweetDto } from '../../../utils/dtos/twitter/tweetDto';
import { Container } from 'typedi';
import { TwitterService } from '../../../services/twitterService';
import { TrendsDto } from '../../../utils/dtos/twitter/trendsDto';
import { trendsValidation } from '../../../utils/validation/twitter/trendsValidation';

const router = express.Router();

router.get(
  '/trends/place',
  requireAuth,
  trendsValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const trendsDto = (req.query as unknown) as TrendsDto;
    const userId = req.currentUser!.userId;
    const twitterService = Container.get(TwitterService);

    const trends = await twitterService.trends(userId, trendsDto);

    res.send(trends);
  }
);

export { router as twitterTrendsRouter };
