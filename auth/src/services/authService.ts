import { Service } from 'typedi';
import { SendActivationEmailPublisher } from '../events/publishers/send-activation-email-publisher';
import { UserCreatedPublisher } from '../events/publishers/user-created-publisher';
import { natsWrapper } from '../nats-wrapper';
import { UserRepository } from '../repositories/userRepository';
import { CreateUserDto } from '../utils/dtos/createUserDto';

@Service()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.createUser(createUserDto);

    await new UserCreatedPublisher(natsWrapper.client).publish({
      id: user.id,
      email: user.email,
    });

    await new SendActivationEmailPublisher(natsWrapper.client).publish({
      email: user.email,
      activationToken: user.confirmationToken,
    });
  }
}
