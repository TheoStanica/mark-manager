import { requireAuth, validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import Container from 'typedi';
import { FacebookService } from '../../../services/facebookService';
import { FacebookFeedDto } from '../../../utils/dtos/facebook/feed';
import { FacebookPostOnPageDto } from '../../../utils/dtos/facebook/pages';
import { feedValidation } from '../../../utils/validation/facebook/feed';
import { postfeedValidation } from '../../../utils/validation/facebook/post';

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

router.post(
  '/pages/feed',
  requireAuth,
  postfeedValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const dto = req.body as FacebookPostOnPageDto;
    const userId = req.currentUser!.userId;
    const FBService = Container.get(FacebookService);
    await FBService.postPageFeed(userId, dto);

    res.sendStatus(201);
  }
);

export { router as facebookPagesFeedRouter };
