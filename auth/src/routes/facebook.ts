import express, { Request, Response } from 'express';
import { requireAuth } from '@tcosmin/common';
import passport from 'passport';

const router = express.Router();
const hostURL = process.env.HOST_URL;

router.get(
  '/facebook/connect',
  requireAuth,
  async (req: Request, res: Response) => {
    req.session.userId = req.currentUser?.userId;
    res.send({
      appId: process.env.FACEBOOK_APP_ID,
      redirect: `https://${hostURL}/api/auth/facebook/callback`,
    });
  }
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/facebook/connect?success=true',
    failureRedirect: '/facebook/connect?success=false',
    session: false,
  })
);

export { router as facebookConnectRouter };
