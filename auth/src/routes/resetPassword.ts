import { validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import Container from 'typedi';
import { AuthService } from '../services/authService';
import { ResetPasswordDto } from '../utils/dtos/resetPasswordDto';
import { ResetPasswordRequestDto } from '../utils/dtos/resetPasswordRequestDto';
import { resetPasswordRequestValidation } from '../utils/validation/resetPasswordRequestValidation';
import { resetPasswordValidation } from '../utils/validation/resetPasswordValidation';

const router = express.Router();

router.post(
  '/resetpassword',
  resetPasswordRequestValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const resetPasswordRequestDto = req.body as ResetPasswordRequestDto;

    const authService = Container.get(AuthService);
    await authService.resetPasswordRequest(resetPasswordRequestDto);

    res.sendStatus(204);
  }
);

router.post(
  '/resetpassword/:resetToken',
  resetPasswordValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const { resetToken } = req.params;
    const resetPasswordDto = req.body as ResetPasswordDto;

    const authService = Container.get(AuthService);
    await authService.resetPassword(resetToken, resetPasswordDto);

    res.sendStatus(204);
  }
);

export { router as resetPasswordRouter };
