import { UserProfile, UserAttrs, UserDoc } from '../models/userprofile';

export class UserProfileController {
  static createUser(userAttrs: UserAttrs): UserDoc {
    const user = UserProfile.build(userAttrs);
    user.save();
    return user;
  }
}
