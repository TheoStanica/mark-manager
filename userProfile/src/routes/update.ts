import express, { Request, Response } from 'express';
import { BadRequestError, requireAuth, validateRequest } from '@tcosmin/common';
import { body } from 'express-validator';
import { UserProfileController } from '../controllers/userprofile-controller';
import { UserDoc, UserProfile } from '../models/userprofile';

const router = express.Router();

router.put(
  '/api/user/currentUser',
  requireAuth,
  [
    body('fullName').isLength({ min: 4, max: 30 }).optional(),
    body('profilePicture').isURL().optional(),
  ],

  validateRequest,
  async (req: Request, res: Response) => {
    const { fullName, profilePicture } = req.body as UserDoc;

    const user = await UserProfileController.findUserWithId(
      req.currentUser!.userId
    );

    const updatedUser = await UserProfileController.updateUser(
      req.currentUser!.userId,
      {
        fullName: fullName ? fullName : user!.fullName,
        profilePicture: profilePicture ? profilePicture : user!.profilePicture,
      }
    );

    res.send({ updatedUser });
  }
);

export { router as updateCurrentUserRouter };
