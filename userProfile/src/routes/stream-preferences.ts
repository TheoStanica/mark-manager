import express, { Request, Response } from 'express';
import { BadRequestError, requireAuth, validateRequest } from '@tcosmin/common';
import { body } from 'express-validator';
import { UserProfileController } from '../controllers/userprofile-controller';
import { UserDoc } from '../models/userprofile';

const router = express.Router();

router.post(
  '/api/user/streampreferences',
  requireAuth,
  [
    body('stream_preferences')
      .exists()
      .withMessage('stream_preferences is required.'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { stream_preferences } = req.body as UserDoc;
    const user = await UserProfileController.updateStreamPreferences(
      req.currentUser!.userId,
      stream_preferences
    );

    if (!user) {
      throw new BadRequestError(
        'Something went wrong. Please try again later!'
      );
    }
    res.sendStatus(204);
  }
);

router.get(
  '/api/user/streampreferences',
  requireAuth,
  async (req: Request, res: Response) => {
    const user = await UserProfileController.findUserWithId(
      req.currentUser!.userId
    );
    if (!user) {
      throw new BadRequestError(
        'Something went wrong. Please try again later!'
      );
    }
    res.send({ streams: user.stream_preferences });
  }
);

export { router as streamPreferencesRouter };
