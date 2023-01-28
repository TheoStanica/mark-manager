import { TwitterDoc } from '../../models/twitter';

export type ConnectedAccountTypes = 'twitter';

export interface ITwitterData extends TwitterDoc {}

export interface IConnectedAccount<T> {
  type: ConnectedAccountTypes;
  data: T;
}

export function isTwitterAccount(
  account: IConnectedAccount<unknown>
): account is IConnectedAccount<ITwitterData> {
  return account.type === 'twitter';
}
