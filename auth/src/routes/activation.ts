import { AccountAlreadyActivatedError, BadRequestError } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import { UserController } from '../controllers/userController';

const router = express.Router();

router.get(
  '/api/users/activation/:activationToken',
  async (req: Request, res: Response) => {
    // get the token from request params
    const confirmationToken = req.params.activationToken;

    // try to find an user with that activation token
    const user = await UserController.findUserWithConfirmationToken(
      confirmationToken
    );

    // if user can't be found, throw an error,
    if (!user) {
      throw new BadRequestError('Invalid Activation token');
    }

    // if user is already active, ?
    if (user.confirmed === true) {
      throw new AccountAlreadyActivatedError();
    } else {
      // check if token expired
      if (new Date(user.confirmationExpireDate) < new Date()) {
        throw new BadRequestError(
          'Activation token expired. Please request a new one!'
        );
      }

      // else, send back a message saying user is activated, please login(or login automatically?)
      await UserController.activateUserWithId(user.id!);

      // TODO Redirect to Login Page? or automatically login?
      res.send('Account successfully confirmed!');
    }
  }
);

export { router as activationRouter };
