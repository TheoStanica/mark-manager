import { Service } from 'typedi';
import { EmailChangedPublisher } from '../events/publishers/email-changed-publisher';
import { natsWrapper } from '../nats-wrapper';
import { UserProfileRepository } from '../repositories/userProfileRepository';
import { UpdateStreamPreferenceDto } from '../utils/dtos/updateStreamPreferenceDto';
import { UpdateUserDto } from '../utils/dtos/updateUserDto';

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

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    const { email } = updateUserDto;

    const currentUser = await this.userProfileRepository.fetchUser(userId);
    const updatedUser = await this.userProfileRepository.updateUser(
      userId,
      currentUser!.email,
      updateUserDto
    );

    if (email && currentUser!.email !== email) {
      await new EmailChangedPublisher(natsWrapper.client).publish({
        userId,
        email,
      });
    }
    return updatedUser;
  }
}
