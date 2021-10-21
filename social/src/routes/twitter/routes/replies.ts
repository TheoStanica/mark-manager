import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@tcosmin/common';
import { replyValidation } from '../../../utils/validation/twitter/replyValidation';
import { fetchTwitterAccountTokens } from '../../../services/getTwitterAccountTokens';
import { SearchPayload } from '../../../utils/interfaces/twitter/searchPayload';
import { handleTwitterErrors } from '../../../services/handleTwitterErrors';
import { Tweet } from '../../../utils/interfaces/twitter/tweet';
import axios from 'axios';
import twit from 'twit';
import { RepliesDto } from '../../../utils/dtos/twitter/repliesDto';
import Container from 'typedi';
import { UserService } from '../../../services/userService';

const router = express.Router();
const consumerKey = process.env.TWITTER_CONSUMER_KEY!;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET!;

router.get(
  '/search/tweets/comments',
  requireAuth,
  replyValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const repliesDto = (req.query as unknown) as RepliesDto;
    const userId = req.currentUser!.userId;
    const userService = Container.get(UserService);

    const tweets = await userService.replies(userId, repliesDto);

    res.send(tweets);
  }
);

export { router as twitterCommentsRouter };
