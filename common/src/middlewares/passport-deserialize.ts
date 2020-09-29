import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}
interface TokenPayload {
  userId: string;
}
export const deserializer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.deserializeUser((userJwt: string, done) => {
    try {
      const payload = jwt.verify(userJwt, process.env.JWT_KEY!) as TokenPayload;
      done(undefined, payload);
    } catch (err) {}
  });
  next();
};
