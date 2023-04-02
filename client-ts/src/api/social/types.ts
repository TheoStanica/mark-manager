import { IConnectedAccount } from '../../core/types/social';

export interface ITwitterAccountData {
  hasAdsAccount: boolean;
  twitterScreenName: string;
  twitterUserId: string;
}

export interface IFacebookAccountData {
  _id: string;
  data: {
    id: string;
    displayName: string;
    username?: string;
  };
  pages: Array<{
    category: string;
    id: string;
    name: string;
  }>;
}

export function isTwitterAccount(
  account: IConnectedAccount<unknown>
): account is IConnectedAccount<ITwitterAccountData> {
  return account.type === 'twitter';
}

export function isFacebookAccount(
  account: IConnectedAccount<unknown>
): account is IConnectedAccount<IFacebookAccountData> {
  return account.type === 'facebook';
}
