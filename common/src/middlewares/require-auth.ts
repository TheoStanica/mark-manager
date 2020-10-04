import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';

// declare global {
//   namespace Express {
//     interface Request {
//       user?: string[];
//     }
//   }
// }

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if (!req.user) {
  //   throw new NotAuthorizedError();
  // }
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('Token not found');
    throw new NotAuthorizedError();
  }

  try {
    jwt.verify(token, process.env.JWT_KEY!);
    next();
  } catch (e) {
    console.log('invalid token');
    throw new NotAuthorizedError(); // change to Forbidden later
  }

  // next();
};
