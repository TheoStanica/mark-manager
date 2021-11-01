import { ForbiddenError, NotAuthorizedError } from '@tcosmin/common';
import { Service } from 'typedi';
import { AccessTokenRevokedPublisher } from '../events/publishers/access-token-revoked-publisher';
import { SendActivationEmailPublisher } from '../events/publishers/send-activation-email-publisher';
import { UserCreatedPublisher } from '../events/publishers/user-created-publisher';
import { natsWrapper } from '../nats-wrapper';
import { UserRepository } from '../repositories/userRepository';
import { UserCredentialsDto } from '../utils/dtos/userCredentialsDto';
import { RedisService } from './redis-service';

@Service()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly redisService: RedisService
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
