export interface IUserData {
  user: ICurrentUser;
}

export interface ICurrentUser {
  email: string;
  fullName?: string;
  profilePicture?: string;
  userTier: string;
  stream_preferences: Array<IStreamPreference<unknown>>;
  themePreference?: string;
}

export type TwitterStreamTypes = 'home_timeline' | 'search';
export type StreamPlatformType = 'twitter';
export interface IStreamPreference<T> {
  id: string;
  platform: StreamPlatformType;
  data: T;
}

export interface ITwitterStreamData {
  type: TwitterStreamTypes;
  search?: string;
  twitterUserId: string;
}

export function isTwitterStream(
  stream: IStreamPreference<unknown>
): stream is IStreamPreference<ITwitterStreamData> {
  return stream.platform === 'twitter';
}

export interface IStreamPreferenceMutation {
  stream_preferences: Array<IStreamPreference<unknown>>;
}
