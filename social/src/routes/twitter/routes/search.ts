import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@tcosmin/common';
import { searchValidation } from '../../../utils/validation/twitter/searchValidation';
import { SearchDto } from '../../../utils/dtos/twitter/searchDto';
import Container from 'typedi';
import { UserService } from '../../../services/userService';

const router = express.Router();

router.get(
  '/search/tweets',
  requireAuth,
  searchValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const searchDto = (req.query as unknown) as SearchDto;
    const userId = req.currentUser!.userId;
    const userService = Container.get(UserService);
    const statuses = await userService.search(userId, searchDto);

    res.send({ statuses });
  }
);

export { router as twitterSearchRouter };
