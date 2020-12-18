import { BadRequestError } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import { User } from '../models/users';
import { Password } from '../services/password';
import 'express-async-errors';
import { body } from 'express-validator';
import { redisWrapper } from '../redis-wrapper';
import { RedisService } from '../services/redis-service';
import { TokenService } from '../services/token-service';
import { UserController } from '../controllers/userController';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await UserController.validateUserCredentials(
      email,
      password
    );
    if (!existingUser) {
      throw new BadRequestError('Invalid Credentials');
    }

    const accessToken = TokenService.generateAccessToken({
      userId: existingUser.id,
      email: existingUser.email,
      role: 'free',
      // ipAddress: req.headers['x-forwarded-for'],
      // userAgent: req.headers['user-agent'],
    });

    const refreshToken = TokenService.generateRefreshToken({
      userId: existingUser.id,
      email: existingUser.email,
      role: 'free',
      // ipAddress: req.headers['x-forwarded-for'],
      // userAgent: req.headers['user-agent'],
    });

    const redisService = new RedisService(redisWrapper.client);

    redisService.whitelistRefreshTokens({
      userId: existingUser.id,
      refreshToken,
      accessToken,
    });

    res.status(200).send({ existingUser, accessToken, refreshToken });
  }
);

export { router as signinRouter };
