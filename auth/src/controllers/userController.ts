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

  static async updateUserPassword(
    userId: string,
    oldPassword: string,
    newPasword: string
  ) {
    const existingUser = await User.findById(userId);

    if (!(await Password.compare(existingUser!.password, oldPassword))) {
      return null;
    }
    const password = await Password.toHash(newPasword);
    return await User.findByIdAndUpdate(
      userId,
      {
        password,
      },
      { new: true }
    );
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

  static async updateUserEmail(userId: string, email: string) {
    return await User.findByIdAndUpdate(
      userId,
      {
        email,
      },
      { new: true }
    );
  }

  static async addTwitterTokens(
    userId: string,
    oauthAccessToken: string,
    oauthAccessTokenSecret: string
  ) {
    return await User.findByIdAndUpdate(
      userId,
      {
        twitter: {
          oauthAccessToken: oauthAccessToken,
          oauthAccessTokenSecret: oauthAccessTokenSecret,
        },
      },
      {
        new: true,
      }
    );
  }

  static async createResetTokens(email: string) {
    const user = await User.findOneAndUpdate(
      {
        email: email,
      },
      {
        passwordResetToken: crypto.randomBytes(20).toString('hex'),
        passwordResetExpireDate: new Date(+new Date() + 10 * 60 * 1000),
      },
      { new: true }
    );
    if (user) {
      return user.passwordResetToken;
    } else {
      return null;
    }
  }

  static async resetUserPassword(resetToken: string, newPassword: string) {
    const user = await User.findOne({ passwordResetToken: resetToken });

    if (user) {
      const hashedPassword = await Password.toHash(newPassword);

      if (new Date(user.passwordResetExpireDate) < new Date()) {
        return null;
      }

      const updatedUser = await User.findByIdAndUpdate(
        user.id,
        {
          password: hashedPassword,
          $unset: {
            passwordResetToken: 1,
            passwordResetExpireDate: 1,
          },
        },
        { new: true }
      );
      return updatedUser;
    } else {
      return null;
    }
  }
}
