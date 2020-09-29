import { Request, Response, NextFunction } from 'express';
declare global {
    namespace Express {
        interface Request {
            user?: string[];
        }
    }
}
export declare const requireAuth: (req: Request, res: Response, next: NextFunction) => void;
