import { BadRequestError } from '@tcosmin/common';
import { Service } from 'typedi';
import { UserAttrs, UserProfile } from '../models/userprofile';
import { UpdateUserDto } from '../utils/dtos/updateUserDto';
import { IStreamPreference } from '../utils/interfaces/streamPreference';

@Service()
export class UserProfileRepository {
  private readonly UserProfile;
  constructor() {
    this.UserProfile = UserProfile;
  }

  async createUser(userAttrs: UserAttrs) {
    const user = UserProfile.build(userAttrs);
    await user.save();
    return user;
  }

  async fetchUser(userId: string) {
    return this.UserProfile.findById(userId);
  }

  async updateStreamPreference(
    userId: string,
    streams: IStreamPreference<unknown>[]
  ) {
    return this.UserProfile.findByIdAndUpdate(
      userId,
      { stream_preferences: streams },
      { new: true }
    );
  }

  async updateUser(
    userId: string,
    userEmail: string,
    updateUserDto: UpdateUserDto
  ) {
    const { email, fullName, profilePicture, themePreference } = updateUserDto;

    if (email && (await this.emailExists(email, userEmail))) {
      throw new BadRequestError('Email in use');
    }

    return this.UserProfile.findByIdAndUpdate(
      userId,
      {
        email,
        fullName,
        profilePicture,
        themePreference,
      },
      { omitUndefined: true, new: true }
    );
  }

  private async emailExists(email: string, userEmail: string) {
    const user = await this.UserProfile.findOne({
      email: { $eq: email, $nin: [userEmail] },
    });
    return user ? true : false;
  }
}
