import express, { Request, Response } from 'express';
import { requireAuth } from '@tcosmin/common';
import Container from 'typedi';
import { UserProfileService } from '../services/userProfileService';

const router = express.Router();

router.get('/currentUser', requireAuth, async (req: Request, res: Response) => {
  const userId = req.currentUser!.userId;

  const userProfileService = Container.get(UserProfileService);
  const user = await userProfileService.fetchUser(userId);

  res.send({ user });
});

export { router as showCurrentUserRouter };
