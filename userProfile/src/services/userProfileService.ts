import { Service } from 'typedi';
import { UserProfileRepository } from '../repositories/userProfileRepository';
import { UpdateStreamPreferenceDto } from '../utils/dtos/updateStreamPreferenceDto';

@Service()
export class UserProfileService {
  constructor(private readonly userProfileRepository: UserProfileRepository) {}

  async fetchUser(userId: string) {
    return this.userProfileRepository.fetchUser(userId);
  }

  async fetchStreams(userId: string) {
    const user = await this.fetchUser(userId);
    return user!.stream_preferences;
  }

  async updateStreamPreference(
    userId: string,
    updateStreamPreferenceDto: UpdateStreamPreferenceDto
  ) {
    const { stream_preferences } = updateStreamPreferenceDto;

    return this.userProfileRepository.updateStreamPreference(
      userId,
      stream_preferences
    );
  }
}
