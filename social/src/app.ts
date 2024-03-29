import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError } from '@tcosmin/common';
import { apiRouter } from './routes';
import { internalRouter } from './routes/internal';
import promBundle from 'express-prom-bundle';

const app = express();
const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  promClient: {
    collectDefaultMetrics: {},
  },
});

app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(json());

app.use(metricsMiddleware);
app.use('/api/social', apiRouter);
app.use('/', internalRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
