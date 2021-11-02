import { validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import Container from 'typedi';
import { AuthService } from '../services/authService';
import { TokenRefreshDto } from '../utils/dtos/tokenRefreshDto';
import { tokenRefreshValidation } from '../utils/validation/tokenRefreshValidation';

const router = express.Router();

router.post(
  '/token',
  tokenRefreshValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const refreshTokenDto = req.body as TokenRefreshDto;

    const authService = Container.get(AuthService);
    const tokens = await authService.refreshTokens(refreshTokenDto);

    res.send(tokens);
  }
);

export { router as tokenRouter };
