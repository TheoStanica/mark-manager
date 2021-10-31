import { Service } from 'typedi';
import { UserProfile } from '../models/userprofile';
import { StreamPreference } from '../utils/interfaces/streamPreference';

@Service()
export class UserProfileRepository {
  private readonly UserProfile;
  constructor() {
    this.UserProfile = UserProfile;
  }

  async fetchUser(userId: string) {
    return this.UserProfile.findById(userId);
  }

  async updateStreamPreference(userId: string, streams: StreamPreference[]) {
    return this.UserProfile.findByIdAndUpdate(
      userId,
      { stream_preferences: streams },
      { new: true }
    );
  }
}
