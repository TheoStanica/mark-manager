import { validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import Container from 'typedi';
import { AuthService } from '../services/authService';
import { ActivationRequestDto } from '../utils/dtos/activationRequestDto';
import { activationRequestValidation } from '../utils/validation/activationRequestValidation';

const router = express.Router();

router.post(
  '/activation/resend',
  activationRequestValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const activationRequestDto = req.body as ActivationRequestDto;

    const authService = Container.get(AuthService);
    await authService.resendActivationRequest(activationRequestDto);

    res.sendStatus(204);
  }
);

export { router as resendActivationRouter };
