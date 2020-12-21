import express, { Request, Response } from 'express';

const router = express.Router();

router.post(
  '/api/users/activation/resend',
  async (req: Request, res: Response) => {
    res.send('Hello');
  }
);

export { router as resendActivationRouter };
