import {
  NotAuthorizedError,
  ForbiddenError,
  BadRequestError,
} from '@tcosmin/common';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { redisWrapper } from '../redis-wrapper';
import { RedisService } from '../services/redis-service';
import { TokenService } from '../services/token-service';

const router = express.Router();

interface TokenPayload {
  userId: string;
  role: string;
  email: string;
  // ipAddress: string;
  // userAgent: string;
  iat: number;
}

router.post('/api/users/token', async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new BadRequestError('No token provided');
  }
  console.log('refresh token was sent');

  const payload = (await TokenService.verifyRefreshToken(
    refreshToken
  )) as TokenPayload;

  console.log('payload is', payload);
  const theuser = payload.userId;
  console.log('theuser', theuser);

  const redisService = new RedisService(redisWrapper.client);

  if (!(await redisService.exists(`${payload.userId}_${refreshToken}`))) {
    //treat as an attack
    console.log('attack handling logic');

    const ATstoBan = await redisService.blacklistUser(payload.userId);

    // TODO publish event to ban ATs

    ATstoBan.forEach(async (accessToken) => {
      console.log(accessToken, 'will be revoked in Redis and event published');
    });

    throw new BadRequestError('');
  }

  await redisService.blacklistRefreshToken(refreshToken, payload.userId);

  const newAccessToken = TokenService.generateAccessToken({
    userId: payload.userId,
    email: payload.email,
    role: 'free',
  });

  const newRefreshToken = TokenService.generateRefreshToken({
    userId: payload.userId,
    email: payload.email,
    role: 'free',
  });

  await redisService.whitelistRefreshTokens({
    userId: payload.userId,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });

  res.send({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });
});

export { router as tokenRouter };
