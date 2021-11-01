import { BadRequestError } from '@tcosmin/common';
import { Service } from 'typedi';
import { User, UserModel } from '../models/users';
import { UserCredentialsDto } from '../utils/dtos/userCredentialsDto';
import crypto from 'crypto';

@Service()
export class UserRepository {
  private readonly User: UserModel;
  constructor() {
    this.User = User;
  }

  async createUser(userCredentialsDto: UserCredentialsDto) {
    const { email } = userCredentialsDto;

    if (await this.isEmailInUse(email)) {
      throw new BadRequestError('Email in use');
    }

    const user = this.User.build(userCredentialsDto);
    user.confirmationToken = crypto.randomBytes(20).toString('hex');
    return await user.save();
  }

  private async isEmailInUse(email: string) {
    return (await this.User.findOne({ email })) ? true : false;
  }
}
