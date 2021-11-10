import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@tcosmin/common';
import { replyValidation } from '../../../utils/validation/twitter/replyValidation';
import { RepliesDto } from '../../../utils/dtos/twitter/repliesDto';
import Container from 'typedi';
import { TwitterService } from '../../../services/twitterService';

const router = express.Router();

router.get(
  '/search/tweets/comments',
  requireAuth,
  replyValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const repliesDto = (req.query as unknown) as RepliesDto;
    const userId = req.currentUser!.userId;
    const twitterService = Container.get(TwitterService);

    const tweets = await twitterService.replies(userId, repliesDto);

    res.send(tweets);
  }
);

export { router as twitterCommentsRouter };
