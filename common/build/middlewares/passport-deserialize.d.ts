/// <reference types="passport" />
import { Request, Response, NextFunction } from 'express';
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
export declare const deserializer: (req: Request, res: Response, next: NextFunction) => void;
