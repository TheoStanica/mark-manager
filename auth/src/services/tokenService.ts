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
