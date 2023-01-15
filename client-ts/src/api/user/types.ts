export interface IUserData {
  user: ICurrentUser;
}

export interface ICurrentUser {
  email: string;
  fullName?: string;
  profilePicture?: string;
  userTier: string;
  stream_preferences: Array<IStreamPreference>;
  themePreference?: string;
}

export interface IStreamPreference {
  id: string;
  type: string;
  search?: string;
  twitterUserId: string;
}
