import { validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import { userCredentialsValidation } from '../utils/validation/userCredentialsValidation';
import { UserCredentialsDto } from '../utils/dtos/userCredentialsDto';
import Container from 'typedi';
import { AuthService } from '../services/authService';

const router = express.Router();

router.post(
  '/signin',
  userCredentialsValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const userCredentialsDto = req.body as UserCredentialsDto;

    const authService = Container.get(AuthService);
    const tokens = await authService.singIn(userCredentialsDto);

    res.send(tokens);
  }
);

export { router as signinRouter };
