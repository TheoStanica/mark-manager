import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/api/users/signin', (req: Request, res: Response) => {
  console.log(req.body);
  res.send('Signin Route');
});

export { router as signinRouter };
