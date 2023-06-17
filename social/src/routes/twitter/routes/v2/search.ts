import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@tcosmin/common';
import { searchValidation } from '../../../../utils/validation/twitter/searchValidation';
import { SearchDto } from '../../../../utils/dtos/twitter/searchDto';
import Container from 'typedi';
import { TwitterService } from '../../../../services/twitterService';

const router = express.Router();

router.get(
  '/search/tweets',
  requireAuth,
  searchValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const searchDto = req.query as unknown as SearchDto;
    const userId = req.currentUser!.userId;
    const twitterService = Container.get(TwitterService);

    const result = await twitterService.searchV2(userId, searchDto);

    res.send(result);
  }
);

export { router as twitterV2SearchRouter };
