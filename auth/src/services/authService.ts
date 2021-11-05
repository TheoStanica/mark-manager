import { ForbiddenError, NotAuthorizedError } from '@tcosmin/common';
import { Service } from 'typedi';
import { AccessTokenRevokedPublisher } from '../events/publishers/access-token-revoked-publisher';
import { ResetPasswordPublisher } from '../events/publishers/reset-password-publisher';
import { SendActivationEmailPublisher } from '../events/publishers/send-activation-email-publisher';
import { UserCreatedPublisher } from '../events/publishers/user-created-publisher';
import { natsWrapper } from '../nats-wrapper';
import { UserRepository } from '../repositories/userRepository';
import { ActivationRequestDto } from '../utils/dtos/activationRequestDto';
import { ChangePasswordDto } from '../utils/dtos/changePasswordDto';
import { ResetPasswordDto } from '../utils/dtos/resetPasswordDto';
import { ResetPasswordRequestDto } from '../utils/dtos/resetPasswordRequestDto';
import { TokenRefreshDto } from '../utils/dtos/tokenRefreshDto';
import { UserCredentialsDto } from '../utils/dtos/userCredentialsDto';
import { RedisService } from './redis-service';
import { TokenService } from './tokenService';

@Service()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly redisService: RedisService,
    private readonly tokenService: TokenService
  ) {}

  async createUser(userCredentialsDto: UserCredentialsDto) {
    const user = await this.userRepository.createUser(userCredentialsDto);

    await new UserCreatedPublisher(natsWrapper.client).publish({
      id: user.id,
      email: user.email,
    });

    await new SendActivationEmailPublisher(natsWrapper.client).publish({
      email: user.email,
      activationToken: user.confirmationToken,
    });
  }

  async activateAccount(activationToken: string) {
    await this.userRepository.activateAccount(activationToken);
  }

  async resendActivationRequest(activationRequestDto: ActivationRequestDto) {
    const user = await this.userRepository.generateNewActivationData(
      activationRequestDto
    );

    await new SendActivationEmailPublisher(natsWrapper.client).publish({
      email: user.email,
      activationToken: user.confirmationToken,
    });
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    await this.userRepository.changePassword(userId, changePasswordDto);
  }

  async resetPasswordRequest(resetPasswordRequestDto: ResetPasswordRequestDto) {
    const {
      email,
      passwordResetToken,
    } = await this.userRepository.generatePasswordResetToken(
      resetPasswordRequestDto
    );

    await new ResetPasswordPublisher(natsWrapper.client).publish({
      email,
      resetToken: passwordResetToken,
    });
  }

  async resetPassword(resetToken: string, resetPasswordDto: ResetPasswordDto) {
    await this.userRepository.resetPassword(resetToken, resetPasswordDto);
  }

  async singIn(userCredentialsDto: UserCredentialsDto) {
    const user = await this.userRepository.validateCredentials(
      userCredentialsDto
    );

    const tokenPaylod = {
      userId: user.id,
      email: user.email,
    };
    const { accessToken, refreshToken } = this.tokenService.generateTokens(
      tokenPaylod
    );

    this.redisService.whitelistRefreshTokens({
      userId: user.id,
      accessToken,
      refreshToken,
    });

    return { accessToken, refreshToken };
  }

  async refreshTokens(tokenRefreshDto: TokenRefreshDto) {
    const { refreshToken } = tokenRefreshDto;

    const payload = await this.tokenService.validateRefreshToken(refreshToken);
    await this.redisService.tokenTheftPrevention(refreshToken, payload.userId);
    await this.redisService.blacklistRefreshToken(refreshToken, payload.userId);

    const tokens = this.tokenService.generateTokens(payload);
    await this.redisService.whitelistRefreshTokens({
      userId: payload.userId,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }

  async updateEmail(userId: string, email: string) {
    await this.userRepository.updateEmail(userId, email);
  }

  async logoutUser(authHeader: string | undefined) {
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw new ForbiddenError();
    }
    if (await this.redisService.isRevoked(token)) {
      throw new NotAuthorizedError();
    }

    await this.redisService.logoutUser(token);
    await new AccessTokenRevokedPublisher(natsWrapper.client).publish({
      token,
    });
  }
}
