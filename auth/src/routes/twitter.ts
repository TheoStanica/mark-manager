import express, { Request, Response } from 'express';
import { requireAuth } from '@tcosmin/common';
import Container from 'typedi';
import { twitterOAuthService } from '../services/twitterOAuthService';

const router = express.Router();

router.get(
  '/twitter/connect',
  requireAuth,
  async (req: Request, res: Response) => {
    const twitterOAtuhService = Container.get(twitterOAuthService);
    await twitterOAtuhService.getOAuthRequestToken(req, res);
  }
);

router.get('/twitter/callback', async (req: Request, res: Response) => {
  const twitterOAtuhService = Container.get(twitterOAuthService);
  await twitterOAtuhService.getOAuthAccessToken(req, res);
});

export { router as twitterConnectRouter };
