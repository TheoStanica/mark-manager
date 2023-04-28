import { requireAuth, validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import Container from 'typedi';
import { AssistantService } from '../../../services/assitantService';
import { BuildPlannerMessageDto } from '../../../utils/dtos/assistant/plan';
import { planValidation } from '../../../utils/validation/assistant/plan';

const router = express.Router();

router.post(
  '/plan',
  requireAuth,
  planValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const planDto = req.body as BuildPlannerMessageDto;
    const chat = Container.get(AssistantService);

    const response = await chat.suggestPosts(planDto);

    res.send(response);
  }
);

export { router as planRouter };
