import {
  BadRequestError,
  validateRequest,
  ResetPasswordEvent,
} from '@tcosmin/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { UserController } from '../controllers/userController';
import { ResetPasswordPublisher } from '../events/publishers/reset-password-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
  '/api/auth/resetpassword',
  [body('email').isEmail().withMessage('Please provide a valid email')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const resetToken = await UserController.createResetTokens(email);
    if (resetToken) {
      // publish event for Mailer with the token
      await new ResetPasswordPublisher(natsWrapper.client).publish({
        email: email,
        resetToken: resetToken,
      });
    }

    res.send(`reset password route + ${resetToken}`);
    // res.sendStatus(203);
  }
);

router.post(
  '/api/auth/resetpassword/:resetToken',
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

export { router as ResetPasswordRoute };
