import express, { Request, Response } from 'express';
import { requireAuth } from '@tcosmin/common';
import passport from 'passport';
import cors from 'cors';

const router = express.Router();
const hostURL = process.env.HOST_URL;

const corsOptions = {
  origin: 'http://mark.dev',
};

router.get(
  '/facebook/connect',
  requireAuth,
  cors(corsOptions),
  passport.authenticate('facebook', {
    failureRedirect: '/tralala',
  })
  // async (req: Request, res: Response) => {
  //   res.send({
  //     appId: process.env.FACEBOOK_APP_ID,
  //     redirect: `https://${hostURL}/api/auth/facebook/callback`,
  //   });
  // }
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/facebook/connect?success=true',
    failureRedirect: '/facebook/connect?success=false',
  })
);

export { router as facebookConnectRouter };
