export type ConnectedAccountTypes = 'twitter' | 'facebook';

export interface IConnectedAccount<T> {
  type: ConnectedAccountTypes;
  data: T;
}
