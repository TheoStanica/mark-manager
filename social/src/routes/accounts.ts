import express, { Request, Response } from 'express';
import { requireAuth } from '@tcosmin/common';
import Container from 'typedi';
import { UserService } from '../services/userService';

const router = express.Router();

router.get('/accounts', requireAuth, async (req: Request, res: Response) => {
  const userService = Container.get(UserService);
  const userId = req.currentUser!.userId;
  const accounts = await userService.fetchConnectedAccounts(userId);
  res.send(accounts);
});

export { router as twitterAccountsRouter };
