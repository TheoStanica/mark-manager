import { validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import { UserCredentialsDto } from '../utils/dtos/userCredentialsDto';
import Container from 'typedi';
import { AuthService } from '../services/authService';
import { userCredentialsValidation } from '../utils/validation/userCredentialsValidation';

const router = express.Router();

router.post(
  '/signup',
  userCredentialsValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const userCredentialsDto = req.body as UserCredentialsDto;

    const authService = Container.get(AuthService);
    await authService.createUser(userCredentialsDto);

    res.sendStatus(201);
  }
);

export { router as signupRouter };
