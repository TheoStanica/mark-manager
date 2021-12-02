import express from 'express';

const internalRouter = express.Router();

internalRouter.get('/health', (req, res) => {
  res.sendStatus(200);
});

internalRouter.get('/stress', (req, res) => {
  let count = 0;
  for (let i = 0; i <= 1000000; i++) {
    count = i;
  }
  res.send('Hello');
});

export { internalRouter };
