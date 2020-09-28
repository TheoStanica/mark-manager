import { NotFoundError } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import { User } from '../models/users';

const router = express.Router();

router.post('/api/users/signup', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new NotFoundError();
  }

  const user = User.build({
    email,
    password,
  });
  await user.save();

  res.status(201).send(user);
});

export { router as signupRouter };
