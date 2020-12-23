import { BadRequestError, validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { UserController } from '../controllers/userController';

const router = express.Router();

router.post(
  '/api/users/activation/resend',
  [
    body('userId')
      .isLength({ max: 24, min: 24 })
      .withMessage('UserID is not valid')
      .isHexadecimal()
      .withMessage('UserID is not valid'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    //get userId from req.params
    const { userId } = req.body;

    // check if there is a user with that userID
    // if there isnt throw BadRequestError
    const user = await UserController.findUserWithId(userId);
    if (!user) {
      throw new BadRequestError('UserId is not valid');
    }
    if (user.confirmed) {
      throw new BadRequestError('Account has already been activated');
    }

    // else, generate a new activation Token, update expiration time, and send event to message broker
    const updatedUser = await UserController.generateNewActivationDetails(
      user.id!
    );

    //TODO send event broker for Mailer service
    // TODO change status to 204 and remove updatedUser

    res.status(200).send(updatedUser);
  }
);

export { router as resendActivationRouter };
