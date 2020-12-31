import { BadRequestError, ForbiddenError } from '@tcosmin/common';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: string | undefined;
  role: string;
  email: string | undefined;
  // ipAddress: string;
  // userAgent: string;
  // iat: number;
}

export class TokenService {
  static generateAccessToken(data: TokenPayload): string {
    return jwt.sign(data, process.env.JWT_KEY!, {
      expiresIn: parseInt(process.env.ACCESS_TOKEN_TTL!),
    });
  }

  static generateRefreshToken(data: TokenPayload): string {
    return jwt.sign(data, process.env.JWT_REFRESH_KEY!, {
      expiresIn: parseInt(process.env.REFRESH_TOKEN_TTL!),
    });
  }

  static verifyAccessToken(accessToken: string) {
    return new Promise((resolve, reject) => {
      try {
        const payload = jwt.verify(accessToken, process.env.JWT_KEY!);
        resolve(payload);
      } catch (e) {
        reject(new BadRequestError('Invalid Token'));
        // TODO maybe a different Error?
      }
    });
  }
  static verifyRefreshToken(refreshToken: string) {
    return new Promise((resolve, reject) => {
      try {
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY!);
        resolve(payload);
      } catch (e) {
        reject(new BadRequestError('Invalid Token'));
        // TODO maybe a different Error?
      }
    });
  }
}
