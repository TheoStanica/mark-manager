import { BadRequestError, validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import Container from 'typedi';
import { UserController } from '../controllers/userController';
import { AuthService } from '../services/authService';
import { ResetPasswordRequestDto } from '../utils/dtos/resetPasswordRequestDto';
import { resetPasswordRequestValidation } from '../utils/validation/resetPasswordRequestValidation';

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
  [
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { resetToken } = req.params;
    const { password } = req.body;
    const updatedUser = await UserController.resetUserPassword(
      resetToken,
      password
    );

    if (updatedUser) {
      res.send('updated');
    } else {
      throw new BadRequestError('Invalid reset token');
    }
  }
);

export { router as resetPasswordRouter };
