import {
  BadRequestError,
  DatabaseConnectionError,
  validateRequest,
} from '@tcosmin/common';
import express, { Request, Response } from 'express';
import { User } from '../models/users';
import { body } from 'express-validator';
import { redisWrapper } from '../redis-wrapper';
import { RedisService } from '../services/redis-service';
import { TokenService } from '../services/token-service';
import { UserController } from '../controllers/userController';
import crypto from 'crypto';
import { UserCreatedPublisher } from '../events/publishers/user-created-publisher';
import { natsWrapper } from '../nats-wrapper';
import { SendActivationEmailPublisher } from '../events/publishers/send-activation-email-publisher';

const router = express.Router();

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const redisService = new RedisService(redisWrapper.client);

    const { email, password } = req.body;

    if (await UserController.checkIfUserExists(email)) {
      throw new BadRequestError('Email in use');
    }

    const user = UserController.createUser({ email, password });

    // const accessToken = TokenService.generateAccessToken({
    //   userId: user.id,
    //   email: user.email,
    //   role: 'free',
    // });

    // const refreshToken = TokenService.generateRefreshToken({
    //   userId: user.id,
    //   email: user.email,
    //   role: 'free',
    // });

    // whitelist tokens
    // redisService.whitelistRefreshTokens({
    //   userId: user.id,
    //   accessToken,
    //   refreshToken,
    // });

    // save UID_RT : AT in Redis(RTTL)
    // save AT : RT in Redis (RTTL)

    await new UserCreatedPublisher(natsWrapper.client).publish({
      id: user.id!,
      email: user.email,
    });

    await new SendActivationEmailPublisher(natsWrapper.client).publish({
      email: user.email,
      activationToken: user.confirmationToken,
    });

    // TODO change this to send only "User Created, please check your Email to confirm your account" or something similar...
    // after Mailer microservice is up and running.
    res.status(201).send({ user });
  }
);

export { router as signupRouter };
