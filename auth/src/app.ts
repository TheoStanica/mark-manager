import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError } from '@tcosmin/common';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { tokenRouter } from './routes/token';
import { activationRouter } from './routes/activation';
import { resendActivationRouter } from './routes/resend-activation';
import { ChangePasswordRouter } from './routes/change-password';
import { TwitterConnectRouter } from './routes/twitter';
import session from 'express-session';
import { ResetPasswordRoute } from './routes/reset-password';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  session({
    secret: 'somethingVerySecret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(tokenRouter);
app.use(resendActivationRouter);
app.use(activationRouter);
app.use(ChangePasswordRouter);
app.use(ResetPasswordRoute);
app.use(TwitterConnectRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
