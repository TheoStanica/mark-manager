import express, { Request, Response } from 'express';
import { requireAuth } from '@tcosmin/common';
import { UserController } from '../../controllers/user-controller';

const router = express.Router();

router.get(
  '/api/social/twitter/accounts',
  requireAuth,
  async (req: Request, res: Response) => {
    const accounts = await UserController.getUserAllTwitterAccounts(
      req.currentUser!.userId
    );
    res.send(accounts);
  }
);

export { router as twitterAccountsRouter };
