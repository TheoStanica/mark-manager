import express, { Request, Response } from 'express';

const router = express.Router();

router.post(
  '/api/users/activation/:activationToken',
  async (req: Request, res: Response) => {
    res.status(201).send('Hello');
  }
);

export { router as activationRouter };
