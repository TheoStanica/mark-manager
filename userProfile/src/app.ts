import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError } from '@tcosmin/common';
import { showCurrentUserRouter } from './routes/show';
import { updateCurrentUserRouter } from './routes/update';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(showCurrentUserRouter);
app.use(updateCurrentUserRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
