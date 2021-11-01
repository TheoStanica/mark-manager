import { validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { CreateUserDto } from '../utils/dtos/createUserDto';
import Container from 'typedi';
import { AuthService } from '../services/authService';

const router = express.Router();

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const createUserDto = req.body as CreateUserDto;

    const authService = Container.get(AuthService);
    await authService.createUser(createUserDto);

    res.sendStatus(201);
  }
);

export { router as signupRouter };
