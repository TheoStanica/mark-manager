import {
  AccountAlreadyActivatedError,
  AccountNotActivatedError,
  BadRequestError,
} from '@tcosmin/common';
import { Service } from 'typedi';
import { User, UserModel } from '../models/users';
import { UserCredentialsDto } from '../utils/dtos/userCredentialsDto';
import crypto from 'crypto';
import { Password } from '../services/password';
import { ActivationRequestDto } from '../utils/dtos/activationRequestDto';
import { ChangePasswordDto } from '../utils/dtos/changePasswordDto';

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

  async validateCredentials(userCredentialsDto: UserCredentialsDto) {
    const { email, password } = userCredentialsDto;

    const user = await this.fetchUser(email);

    if (!user) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordMatch = await Password.compare(user.password, password);
    if (!passwordMatch) {
      throw new BadRequestError('Invalid credentials');
    }
    if (!user.confirmed) {
      throw new AccountNotActivatedError(user.id);
    }

    return user;
  }

  async activateAccount(activationToken: string) {
    const user = await this.User.findOne({
      confirmationToken: activationToken,
    });

    if (!user) {
      throw new BadRequestError('Invalid activation token');
    }
    if (user.confirmed) {
      throw new AccountAlreadyActivatedError();
    }
    if (this.isExpired(user.confirmationExpireDate)) {
      throw new BadRequestError('Activation token expired');
    }

    user.confirmed = true;
    await user.save();
  }

  async generateNewActivationData(activationRequestDto: ActivationRequestDto) {
    const { userId } = activationRequestDto;

    const user = await this.User.findById(userId);
    if (!user) {
      throw new BadRequestError('Invalid userId');
    }
    if (user.confirmed) {
      throw new AccountAlreadyActivatedError();
    }

    const expiration = new Date(+new Date() + 10 * 60 * 1000);
    user.confirmationExpireDate = expiration;
    user.confirmationToken = crypto.randomBytes(20).toString('hex');
    return await user.save();
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const { currentPassword, newPassword } = changePasswordDto;

    const user = await this.User.findById(userId);
    if (!user) {
      throw new BadRequestError("User doesn't exist");
    }
    if (!(await Password.compare(user.password, currentPassword))) {
      throw new BadRequestError('Incorrect password');
    }

    user.password = newPassword;
    return await user.save();
  }

  private isExpired(date: Date) {
    return new Date(date) < new Date() ? true : false;
  }

  private async fetchUser(email: string) {
    return this.User.findOne({ email });
  }

  private async isEmailInUse(email: string) {
    return (await this.User.findOne({ email })) ? true : false;
  }
}
