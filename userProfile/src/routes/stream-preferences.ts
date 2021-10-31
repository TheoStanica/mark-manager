import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@tcosmin/common';
import Container from 'typedi';
import { UserProfileService } from '../services/userProfileService';
import { streamPreferenceValidation } from '../utils/validation/streamPreferenceValidation';
import { UpdateStreamPreferenceDto } from '../utils/dtos/updateStreamPreferenceDto';

const router = express.Router();

router.post(
  '/streampreferences',
  requireAuth,
  streamPreferenceValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const updateStreamPreferenceDto = req.body as UpdateStreamPreferenceDto;
    const userId = req.currentUser!.userId;

    const userProfileService = Container.get(UserProfileService);
    await userProfileService.updateStreamPreference(
      userId,
      updateStreamPreferenceDto
    );

    res.sendStatus(204);
  }
);

router.get(
  '/streampreferences',
  requireAuth,
  async (req: Request, res: Response) => {
    const userId = req.currentUser!.userId;

    const userProfileService = Container.get(UserProfileService);
    const streams = await userProfileService.fetchStreams(userId);

    res.send({ streams });
  }
);

export { router as streamPreferencesRouter };
