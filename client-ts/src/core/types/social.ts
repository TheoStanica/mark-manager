export type ConnectedAccountTypes = 'twitter';

export interface IConnectedAccount<T> {
  type: ConnectedAccountTypes;
  data: T;
}
