import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@tcosmin/common';
import { homeTimelineValidation } from '../../../utils/validation/twitter/homeTimelineValidation';
import Container from 'typedi';
import { UserService } from '../../../services/userService';
import { HomeTimelineDto } from '../../../utils/dtos/twitter/homeTimelineDto';

const router = express.Router();

router.get(
  '/statuses/home_timeline',
  requireAuth,
  homeTimelineValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const homeTimelineDto = (req.query as unknown) as HomeTimelineDto;
    const userId = req.currentUser!.userId;
    const userService = Container.get(UserService);

    const statuses = await userService.homeTimeline(userId, homeTimelineDto);

    res.send({ statuses });
  }
);

export { router as twitterTimelineRouter };
