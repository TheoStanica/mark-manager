import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError } from '@tcosmin/common';
import { twitterCredentialsRouter } from './routes/twitter/verify-credentials';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(twitterCredentialsRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
