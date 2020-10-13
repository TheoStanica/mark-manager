import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError } from '@tcosmin/common';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { tokenRouter } from './routes/token';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(tokenRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
