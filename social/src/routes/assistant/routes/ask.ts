import { requireAuth, validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import Container from 'typedi';
import { AssistantService } from '../../../services/assitantService';
import { askValidation } from '../../../utils/validation/assistant/ask';
import { AskDto } from '../../../utils/dtos/assistant/ask';

const router = express.Router();

router.post(
  '/ask',
  requireAuth,
  askValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const askDto = req.body as AskDto;
    const chat = Container.get(AssistantService);

    const response = await chat.ask(askDto.message);

    res.send(response);
  }
);

export { router as askMeRouter };
