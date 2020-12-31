import express, { Request, Response } from 'express';
import { BadRequestError, requireAuth, validateRequest } from '@tcosmin/common';
import { body } from 'express-validator';
import { UserProfileController } from '../controllers/userprofile-controller';
import { UserDoc, UserProfile } from '../models/userprofile';
import { EmailChangedPublisher } from '../events/publishers/email-changed-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put(
  '/api/user/currentUser',
  requireAuth,
  [
    body('fullName').isLength({ min: 4, max: 30 }).optional(),
    body('profilePicture').isURL().optional(),
    body('email').isEmail().optional(),
  ],

  validateRequest,
  async (req: Request, res: Response) => {
    const { fullName, profilePicture, email } = req.body as UserDoc;

    if (email && (await UserProfileController.emailExists(email))) {
      throw new BadRequestError('An user already has this email');
    }

    const user = await UserProfileController.findUserWithId(
      req.currentUser!.userId
    );
    const updatedUser = await UserProfileController.updateUser(
      req.currentUser!.userId,
      {
        fullName: fullName ? fullName : user!.fullName,
        profilePicture: profilePicture ? profilePicture : user!.profilePicture,
        email: email ? email : user!.email,
      }
    );

    await new EmailChangedPublisher(natsWrapper.client).publish({
      userId: user!.id,
      email: email,
    });

    // TODO send email to user about user details updated

    res.send({ updatedUser });
  }
);

export { router as updateCurrentUserRouter };
