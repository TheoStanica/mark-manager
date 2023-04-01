import { requireAuth, validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import Container from 'typedi';
import { meValidation } from '../../../utils/validation/facebook/me';
import { FacebookMeDto } from '../../../utils/dtos/facebook/me';
import { FacebookService } from '../../../services/facebookService';
import { FacebookAddPageDto } from '../../../utils/dtos/facebook/pages';
import { addPageValidation } from '../../../utils/validation/facebook/pages';

const router = express.Router();

router.get(
  '/pages',
  requireAuth,
  meValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const dto = req.body as FacebookMeDto;
    const userId = req.currentUser!.userId;
    const FBService = Container.get(FacebookService);
    const pages = await FBService.pages(userId, dto.facebookUserId);

    res.send(pages);
  }
);

router.post(
  '/pages',
  requireAuth,
  addPageValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const dto = req.body as FacebookAddPageDto;
    const userId = req.currentUser!.userId;
    const FBService = Container.get(FacebookService);
    await FBService.addPage(userId, dto);

    res.sendStatus(201);
  }
);

export { router as facebookPagesRouter };
