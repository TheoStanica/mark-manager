import { FacebookDoc } from '../../models/facebook';
import { TwitterDoc } from '../../models/twitter';

export type ConnectedAccountTypes = 'twitter' | 'facebook';

export interface ITwitterData extends TwitterDoc {}

export interface IFacebookData extends FacebookDoc {}

export interface IConnectedAccount<T> {
  type: ConnectedAccountTypes;
  data: T;
}

export function isTwitterAccount(
  account: IConnectedAccount<unknown>
): account is IConnectedAccount<ITwitterData> {
  return account.type === 'twitter';
}
