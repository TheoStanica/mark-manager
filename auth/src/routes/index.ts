import express from 'express';
import { activationRouter } from './activation';
import { changePasswordRouter } from './changePassword';
import { resendActivationRouter } from './resendActivation';
import { resetPasswordRouter } from './resetPassword';
import { signinRouter } from './signin';
import { signoutRouter } from './signout';
import { signupRouter } from './signup';
import { tokenRouter } from './token';
import { twitterConnectRouter } from './twitter';

const apiRouter = express.Router();

apiRouter.use(activationRouter);
apiRouter.use(changePasswordRouter);
apiRouter.use(resendActivationRouter);
apiRouter.use(resetPasswordRouter);
apiRouter.use(signinRouter);
apiRouter.use(signoutRouter);
apiRouter.use(signupRouter);
apiRouter.use(tokenRouter);
apiRouter.use(twitterConnectRouter);

export { apiRouter };
