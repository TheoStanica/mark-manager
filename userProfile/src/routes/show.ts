import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import { requireAuth } from '@tcosmin/common';
import { UserProfileController } from '../controllers/userprofile-controller';

const router = express.Router();

router.get(
  '/api/user/currentUser',
  requireAuth,
  async (req: Request, res: Response) => {
    const user = await UserProfileController.findUserWithId(
      req.currentUser!.userId
    );
    res.send({ user });
  }
);

export { router as showCurrentUserRouter };
