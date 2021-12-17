import express, { Request, Response } from 'express';
import { requireAuth } from '@tcosmin/common';
import Container from 'typedi';
import { TwitterOAuthService } from '../services/twitterOAuthService';

const router = express.Router();

router.get(
  '/twitter/connect',
  requireAuth,
  async (req: Request, res: Response) => {
    const twitterOAtuhService = Container.get(TwitterOAuthService);
    await twitterOAtuhService.getOAuthRequestToken(req, res);
  }
);

router.get('/twitter/callback', async (req: Request, res: Response) => {
  const twitterOAtuhService = Container.get(TwitterOAuthService);
  await twitterOAtuhService.getOAuthAccessToken(req, res);
});

export { router as twitterConnectRouter };
