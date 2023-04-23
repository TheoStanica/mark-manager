import { requireAuth, validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import Container from 'typedi';
import { FacebookService } from '../../../services/facebookService';
import { FacebookPostOnPageDto } from '../../../utils/dtos/facebook/pages';
import { postfeedValidation } from '../../../utils/validation/facebook/post';

const router = express.Router();

router.post(
  '/post',
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

export { router as facebookPostPagesRouter };
