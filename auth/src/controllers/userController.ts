import { User, UserAttrs, UserDoc } from '../models/users';
import { Password } from '../services/password';
import crypto from 'crypto';

export class UserController {
  // TODO can i make this async?
  // -- User.create() instead
  static createUser(userAttrs: UserAttrs): UserDoc {
    const user = User.build(userAttrs);
    user.confirmationToken = crypto.randomBytes(20).toString('hex');
    user.save();
    return user;
  }

  static async checkIfUserExists(email: string | RegExp | undefined) {
    const existingUser = await User.findOne({ email });
    return existingUser ? true : false;
  }

  static async validateUserCredentials(
    email: string,
    providedPassword: string
  ) {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return false;
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      providedPassword
    );
    if (!passwordsMatch) {
      return false;
    }
    return existingUser;
  }

  static async findUserWithConfirmationToken(token: string) {
    return User.findOne({ confirmationToken: token });
  }

  static async activateUserWithId(id: string) {
    const user = await User.findById(id);
    user!.confirmed = true;
    user!.save();
  }

  static async findUserWithId(userId: string) {
    return await User.findById(userId);
  }

  static async generateNewActivationDetails(userId: string) {
    // TODO maybe create a global variable instead of hard coded value (easier management)
    const expiration = new Date(+new Date() + 10 * 60 * 1000);
    return await User.findByIdAndUpdate(
      userId,
      {
        confirmationToken: crypto.randomBytes(20).toString('hex'),
        confirmationExpireDate: expiration,
      },
      //send the updated user
      { new: true }
    );
  }
}
