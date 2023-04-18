import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@tcosmin/common';
import Container from 'typedi';
import {
  deleteScheduldFacebookPostValidation,
  scheduleFacebookPostValidation,
  updateScheduldFacebookPostValidation,
} from '../../../utils/validation/facebook/schedule';

import { FacebookScheduleService } from '../../../services/facebookScheduleService';
import {
  DeleteScheduledFacebookPostDto,
  ScheduleFacebookPostDto,
  UpdateScheduledFacebookPostDto,
} from '../../../utils/dtos/facebook/schedule';

const router = express.Router();

router.post(
  '/schedule',
  requireAuth,
  scheduleFacebookPostValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const data = req.body as ScheduleFacebookPostDto;
    const userId = req.currentUser!.userId;
    const fbss = Container.get(FacebookScheduleService);
    await fbss.scheduleFacebookPost(userId, data);

    res.sendStatus(201);
  }
);

router.get(
  '/schedule',
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const userId = req.currentUser!.userId;
    const fbss = Container.get(FacebookScheduleService);
    const data = await fbss.getScheduledFacebookPosts(userId);

    res.send({ posts: data });
  }
);

router.put(
  '/schedule',
  requireAuth,
  updateScheduldFacebookPostValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const userId = req.currentUser!.userId;
    const data = req.body as unknown as UpdateScheduledFacebookPostDto;
    const fbss = Container.get(FacebookScheduleService);
    await fbss.updateScheduledFacebookPost(userId, data);

    res.sendStatus(204);
  }
);

router.delete(
  '/schedule',
  requireAuth,
  deleteScheduldFacebookPostValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const userId = req.currentUser!.userId;
    const data = req.body as unknown as DeleteScheduledFacebookPostDto;
    const fbss = Container.get(FacebookScheduleService);
    await fbss.deleteScheduledFacebookPost(userId, data);

    res.sendStatus(204);
  }
);

export { router as facebookScheduleRouter };
