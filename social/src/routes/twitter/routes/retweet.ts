import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@tcosmin/common';
import { retweetValidation } from '../../../utils/validation/twitter/retweetValidation';
import { RetweetDto } from '../../../utils/dtos/twitter/retweetDto';
import Container from 'typedi';
import { TwitterService } from '../../../services/twitterService';

const router = express.Router();

router.post(
  '/statuses/retweet',
  requireAuth,
  retweetValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const retweetDto = req.body as RetweetDto;
    const userId = req.currentUser!.userId;
    const userService = Container.get(TwitterService);

    await userService.retweet(userId, retweetDto);

    res.sendStatus(204);
  }
);
router.post(
  '/statuses/unretweet',
  requireAuth,
  retweetValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const retweetDto = req.body as RetweetDto;
    const userId = req.currentUser!.userId;
    const twitterService = Container.get(TwitterService);

    await twitterService.unretweet(userId, retweetDto);

    res.sendStatus(204);
  }
);

export { router as twitterRetweetRouter };
