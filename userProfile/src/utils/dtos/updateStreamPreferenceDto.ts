import { IStreamPreference } from '../interfaces/streamPreference';

export interface UpdateStreamPreferenceDto {
  stream_preferences: IStreamPreference<unknown>[];
}
