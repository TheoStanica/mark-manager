import {
  ForbiddenError,
  NotAuthorizedError,
  requireAuth,
} from '@tcosmin/common';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import { redisWrapper } from '../redis-wrapper';
import jwt from 'jsonwebtoken';
import { RedisService } from '../services/redis-service';
import { AccessTokenRevokedPublisher } from '../events/publishers/access-token-revoked-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post('/signout', requireAuth, async (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('Token not found');
    throw new ForbiddenError();
  }

  const redisService = new RedisService(redisWrapper.client);

  if (await redisService.isRevoked(token)) {
    throw new NotAuthorizedError();
  }

  await redisService.logoutUser(token);

  await new AccessTokenRevokedPublisher(natsWrapper.client).publish({
    token: token,
  });

  res.send({});
});

export { router as signoutRouter };
