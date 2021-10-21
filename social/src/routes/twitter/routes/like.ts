import { requireAuth, validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import { likeValidation } from '../../../utils/validation/twitter/likeValidation';
import { LikeDto } from '../../../utils/dtos/twitter/likeDto';
import Container from 'typedi';
import { UserService } from '../../../services/userService';

const router = express.Router();

router.post(
  '/favorites/create',
  requireAuth,
  likeValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const likeDto = req.body as LikeDto;
    const userId = req.currentUser!.userId;
    const userService = Container.get(UserService);

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
    const userService = Container.get(UserService);

    await userService.unlike(userId, likeDto);

    res.sendStatus(204);
  }
);

export { router as twitterLikeRouter };
