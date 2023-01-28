import { IConnectedAccount } from '../../core/types/social';

export interface ITwitterAccountData {
  hasAdsAccount: boolean;
  twitterScreenName: string;
  twitterUserId: string;
}

export function isTwitterAccount(
  account: IConnectedAccount<unknown>
): account is IConnectedAccount<ITwitterAccountData> {
  return account.type === 'twitter';
}
