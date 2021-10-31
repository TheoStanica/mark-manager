import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@tcosmin/common';
import { updateUserValidation } from '../utils/validation/updateUserValidation';
import { UpdateUserDto } from '../utils/dtos/updateUserDto';
import Container from 'typedi';
import { UserProfileService } from '../services/userProfileService';

const router = express.Router();

router.put(
  '/currentUser',
  requireAuth,
  updateUserValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const updateUserDto = req.body as UpdateUserDto;
    const userId = req.currentUser!.userId;

    const userProfileService = Container.get(UserProfileService);
    const updatedUser = await userProfileService.updateUser(
      userId,
      updateUserDto
    );

    res.send({ updatedUser });
  }
);

export { router as updateCurrentUserRouter };
