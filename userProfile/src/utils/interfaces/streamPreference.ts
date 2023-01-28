export type TwitterStreamTypes = 'home_timeline' | 'search';
export type StreamPlatformType = 'twitter';

export interface ITwitterStreamData {
  type: TwitterStreamTypes;
  search?: string;
  twitterUserId: string;
}
export interface IStreamPreference<T> {
  id: string;
  platform: StreamPlatformType;
  data: T;
}

export function isTwitterStream(
  stream: IStreamPreference<unknown>
): stream is IStreamPreference<ITwitterStreamData> {
  return stream.platform === 'twitter';
}
