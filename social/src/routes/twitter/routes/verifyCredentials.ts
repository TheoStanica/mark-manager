import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@tcosmin/common';
import { verifyCredentialsValidation } from '../../../utils/validation/twitter/verifyCredentialsValidation';
import { UserService } from '../../../services/userService';
import { UserIdDto } from '../../../utils/dtos/twitter/twitterUserIdDto';
import Container from 'typedi';

const router = express.Router();

router.get(
  '/user',
  requireAuth,
  verifyCredentialsValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const twitterIdDto = (req.query as unknown) as UserIdDto;
    const userId = req.currentUser!.userId;
    const userService = Container.get(UserService);

    const profileInfo = await userService.fetchTwitterCredentials(
      userId,
      twitterIdDto
    );

    res.send(profileInfo);
  }
);

export { router as twitterCredentialsRouter };
