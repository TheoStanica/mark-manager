import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import jwt from 'jsonwebtoken';
import { ForbiddenError } from '../errors/forbidden-error';

interface UserPayload {
  userId: string;
  email: string;
  rold: string;
  ipAddress: string;
  userAgent: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

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
    throw new ForbiddenError();
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;
    next();
  } catch (e) {
    console.log('invalid token');
    throw new NotAuthorizedError();
  }

  // next();
};
