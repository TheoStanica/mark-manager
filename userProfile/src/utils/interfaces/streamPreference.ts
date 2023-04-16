export type TwitterStreamTypes = 'home_timeline' | 'search';
export type StreamPlatformType = 'twitter' | 'facebook';
export type FacebookStreamTypes = 'page';

export interface ITwitterStreamData {
  type: TwitterStreamTypes;
  search?: string;
  twitterUserId: string;
}

export interface IFacebookStreamData {
  type: FacebookStreamTypes;
  pageId: string;
  facebookUserId: string;
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

export function isFacebookStream(
  stream: IStreamPreference<unknown>
): stream is IStreamPreference<IFacebookStreamData> {
  return stream.platform === 'facebook';
}
