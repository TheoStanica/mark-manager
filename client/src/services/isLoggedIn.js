import { store } from '../redux/store';

export const isLoggedin = () => {
  return store.getState().userReducer.present.accessToken &&
    store.getState().userReducer.present.refreshToken
    ? true
    : false;
};
