import { requireAuth, validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import Container from 'typedi';
import { FacebookService } from '../../../services/facebookService';
import { FacebookFeedDto } from '../../../utils/dtos/facebook/feed';
import { feedValidation } from '../../../utils/validation/facebook/feed';

const router = express.Router();

router.get(
  '/pages/feed',
  requireAuth,
  feedValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const dto = req.query as unknown as FacebookFeedDto;
    const userId = req.currentUser!.userId;
    const FBService = Container.get(FacebookService);
    const pages = await FBService.fetchPageFeed(userId, dto);

    res.send(pages);
  }
);

export { router as facebookPagesFeedRouter };
