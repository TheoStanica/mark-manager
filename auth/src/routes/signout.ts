import { requireAuth } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import Container from 'typedi';
import { AuthService } from '../services/authService';

const router = express.Router();

router.post('/signout', requireAuth, async (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];

  const authService = Container.get(AuthService);
  await authService.logoutUser(authHeader);

  res.sendStatus(204);
});

export { router as signoutRouter };
