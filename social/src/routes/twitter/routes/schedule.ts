import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@tcosmin/common';
import { searchValidation } from '../../../utils/validation/twitter/searchValidation';
import Container from 'typedi';

const router = express.Router();

router.post(
  '/schedule',
  requireAuth,
  // searchValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    console.log('aaa');
    // const searchDto = (req.query as unknown) as SearchDto;
    // const userId = req.currentUser!.userId;
    // const twitterService = Container.get(TwitterService);

    // const statuses = await twitterService.search(userId, searchDto);

    // res.send({ statuses });
    res.sendStatus(201);
  }
);

export { router as twitterScheduleRouter };
