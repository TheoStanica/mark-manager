import { validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import Container from 'typedi';
import { AuthService } from '../services/authService';
import { ActivationTokenDto } from '../utils/dtos/activationTokenDto';
import { accountActivationValidation } from '../utils/validation/accountActivationValidation';

const router = express.Router();

router.post(
  '/activation',
  accountActivationValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const activationTokenDto = req.body as ActivationTokenDto;
    const authService = Container.get(AuthService);

    await authService.activateAccount(activationTokenDto);

    res.sendStatus(204);
  }
);

export { router as activationRouter };
