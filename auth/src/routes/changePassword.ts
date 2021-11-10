import { requireAuth, validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import Container from 'typedi';
import { AuthService } from '../services/authService';
import { ChangePasswordDto } from '../utils/dtos/changePasswordDto';
import { changePasswordValidation } from '../utils/validation/changePasswordValidation';

const router = express.Router();

router.put(
  '/changepassword',
  requireAuth,
  changePasswordValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const changePasswordDto = req.body as ChangePasswordDto;
    const userId = req.currentUser!.userId;

    const authService = Container.get(AuthService);
    await authService.changePassword(userId, changePasswordDto);

    res.sendStatus(204);
  }
);

export { router as changePasswordRouter };
