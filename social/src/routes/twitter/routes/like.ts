import { requireAuth, validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import { likeValidation } from '../../../utils/validation/twitter/likeValidation';
import { LikeDto } from '../../../utils/dtos/twitter/likeDto';
import Container from 'typedi';
import { TwitterService } from '../../../services/twitterService';

const router = express.Router();

router.post(
  '/favorites/create',
  requireAuth,
  likeValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const likeDto = req.body as LikeDto;
    const userId = req.currentUser!.userId;
    const userService = Container.get(TwitterService);

    await userService.like(userId, likeDto);

    res.sendStatus(204);
  }
);
router.post(
  '/favorites/destroy',
  requireAuth,
  likeValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const likeDto = req.body as LikeDto;
    const userId = req.currentUser!.userId;
    const twitterService = Container.get(TwitterService);

    await twitterService.unlike(userId, likeDto);

    res.sendStatus(204);
  }
);

export { router as twitterLikeRouter };
