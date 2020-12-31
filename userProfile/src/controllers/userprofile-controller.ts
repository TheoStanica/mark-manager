import { BadRequestError } from '@tcosmin/common';
import { UserProfile, UserAttrs, UserDoc } from '../models/userprofile';

export class UserProfileController {
  static createUser(userAttrs: UserAttrs): UserDoc {
    const user = UserProfile.build(userAttrs);
    user.save();
    return user;
  }

  static async findUserWithId(userID: string) {
    return await UserProfile.findById(userID);
  }

  static async updateUser(userID: string, data: any) {
    return await UserProfile.findByIdAndUpdate(userID, data, {
      new: true,
    });
  }

  static async emailExists(email: string) {
    const user = await UserProfile.findOne({ email });
    if (user) return true;
    return false;
  }
}
