import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';

interface TokenPayload {
  id: string;
}
export const deserializer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.deserializeUser((userJwt: string, done) => {
    try {
      const payload = jwt.verify(userJwt, process.env.JWT_KEY!) as TokenPayload;
      done(undefined, payload.id);
    } catch (err) {
      done(new BadRequestError('Invalid Token'), null);
    }
  });
  next();
};
