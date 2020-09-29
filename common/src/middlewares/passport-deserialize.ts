import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}
declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
    }
    interface Request {
      user?: User;
    }
  }
}
interface TokenPayload {
  user: {
    id: string;
    email: string;
  };
  iat: number;
}
export const deserializer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.deserializeUser((userJwt: string, done) => {
    try {
      const payload = jwt.verify(userJwt, process.env.JWT_KEY!) as TokenPayload;
      done(undefined, payload.user);
    } catch (err) {}
  });
  next();
};
