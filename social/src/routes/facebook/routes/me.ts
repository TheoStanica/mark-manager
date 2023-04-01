import { requireAuth, validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import Container from 'typedi';
import { meValidation } from '../../../utils/validation/facebook/me';
import { FacebookMeDto } from '../../../utils/dtos/facebook/me';
import { FacebookService } from '../../../services/facebookService';

const router = express.Router();

router.get(
  '/me',
  requireAuth,
  meValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const dto = req.body as FacebookMeDto;
    const userId = req.currentUser!.userId;
    const FBService = Container.get(FacebookService);
    const account = await FBService.me(userId, dto.facebookUserId);

    res.send(account);
  }
);

export { router as facebookMeRouter };
