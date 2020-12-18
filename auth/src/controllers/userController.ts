import { BadRequestError } from '@tcosmin/common';
import { User, UserAttrs, UserDoc } from '../models/users';
import { Password } from '../services/password';

export class UserController {
  //can i make this async?
  // -- User.create() instead
  static createUser(userAttrs: UserAttrs): UserDoc {
    const user = User.build(userAttrs);
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
}
