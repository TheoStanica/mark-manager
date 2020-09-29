import { Request, Response, NextFunction } from 'express';
declare global {
    namespace Express {
        interface User {
            id: string;
        }
    }
}
export declare const deserializer: (req: Request, res: Response, next: NextFunction) => void;
