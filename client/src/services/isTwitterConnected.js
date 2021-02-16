import { store } from '../redux/store';

export const isTwitterConnected = () => {
  return store.getState().twitterReducer.isConnected;
};
