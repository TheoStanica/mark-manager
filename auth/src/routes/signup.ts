import { validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import { CreateUserDto } from '../utils/dtos/createUserDto';
import Container from 'typedi';
import { AuthService } from '../services/authService';
import { createUserValidation } from '../utils/validation/createUserValidation';

const router = express.Router();

router.post(
  '/signup',
  createUserValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const createUserDto = req.body as CreateUserDto;

    const authService = Container.get(AuthService);
    await authService.createUser(createUserDto);

    res.sendStatus(201);
  }
);

export { router as signupRouter };
