import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

export const deserializer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.deserializeUser((id, done) => {
    done(id);
  });
  next();
};
