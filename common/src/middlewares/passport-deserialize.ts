import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  user: {
    id: string;
    email: string;
    __v: string;
    password: string;
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
      const payload = jwt.verify(userJwt, process.env.JWT_KEY!) as UserPayload;
      done(undefined, payload.user);
    } catch (err) {}
  });
  next();
};
