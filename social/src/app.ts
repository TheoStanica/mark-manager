import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError } from '@tcosmin/common';
import { apiRouter } from './routes';
import { internalRouter } from './routes/internal';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use('/api/social', apiRouter);
app.use('/', internalRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
