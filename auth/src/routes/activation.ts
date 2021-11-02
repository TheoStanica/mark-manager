import { validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import Container from 'typedi';
import { AuthService } from '../services/authService';
import { accountActivationValidation } from '../utils/validation/accountActivationValidation';

const router = express.Router();

router.get(
  '/activation/:activationToken',
  accountActivationValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const { activationToken } = req.params;
    const authService = Container.get(AuthService);

    await authService.activateAccount(activationToken);

    res.sendStatus(204);
  }
);

export { router as activationRouter };
