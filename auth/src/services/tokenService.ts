import { BadRequestError, ForbiddenError } from '@tcosmin/common';
import jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import { TokenPayload } from '../utils/interfaces/tokenPayload';

@Service()
export class TokenService {
  generateTokens(tokenPayload: TokenPayload) {
    const accessToken = this.generateAccessToken(tokenPayload);
    const refreshToken = this.generateRefreshToken(tokenPayload);
    return { accessToken, refreshToken };
  }

  validateRefreshToken(refreshToken: string) {
    return new Promise<TokenPayload>((resolve, reject) => {
      try {
        const { email, userId } = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_KEY!
        ) as TokenPayload;
        resolve({ email, userId });
      } catch (e) {
        reject(new BadRequestError('Invalid Token'));
      }
    });
  }

  private generateAccessToken(data: TokenPayload): string {
    return jwt.sign(data, process.env.JWT_KEY!, {
      expiresIn: parseInt(process.env.ACCESS_TOKEN_TTL!),
    });
  }

  private generateRefreshToken(data: TokenPayload): string {
    return jwt.sign(data, process.env.JWT_REFRESH_KEY!, {
      expiresIn: parseInt(process.env.REFRESH_TOKEN_TTL!),
    });
  }
}
