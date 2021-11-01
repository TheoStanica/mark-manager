import { BadRequestError, requireAuth, validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { UserController } from '../controllers/userController';

const router = express.Router();

router.put(
  '/changepassword',
  requireAuth,
  [
    body('currentPassword')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Current Password is not valid'),
    body('newPassword')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('New password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { currentPassword, newPassword } = req.body;

    const updatedUser = await UserController.updateUserPassword(
      req.currentUser!.userId,
      currentPassword,
      newPassword
    );

    if (!updatedUser) {
      throw new BadRequestError('Current Password is not correct.');
    }

    res.status(204).send();
  }
);

export { router as changePasswordRouter };
