import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError } from '@tcosmin/common';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
