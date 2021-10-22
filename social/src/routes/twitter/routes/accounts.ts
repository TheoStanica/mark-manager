import express, { Request, Response } from 'express';
import { requireAuth } from '@tcosmin/common';
import { TwitterService } from '../../../services/twitterService';
import Container from 'typedi';

const router = express.Router();

router.get('/accounts', requireAuth, async (req: Request, res: Response) => {
  const twitterService = Container.get(TwitterService);
  const userId = req.currentUser!.userId;
  const accounts = await twitterService.fetchConnectedAccounts(userId);
  res.send(accounts);
});

export { router as twitterAccountsRouter };
