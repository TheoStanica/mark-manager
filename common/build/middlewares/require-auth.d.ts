import { Request, Response, NextFunction } from 'express';
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
export declare const requireAuth: (req: Request, res: Response, next: NextFunction) => void;
export {};
