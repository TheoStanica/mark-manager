import axios from 'axios';
import { logoutUser, setUserTokens } from '../redux/actions/userActions';
import { store } from '../redux/store';
import { isLoggedin } from '../services/isLoggedIn';

const setAuthHeaderValue = () => {
  return `Bearer ${store.getState().userReducer.present.accessToken}`;
};

const axiosInstance = axios.create(
  { baseURL: 'https://mark.dev' },
  {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: setAuthHeaderValue(),
    },
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
    if (store.getState().userReducer.present.accessToken)
      config.headers.Authorization = setAuthHeaderValue();
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.config && error.response && error.response.status === 401) {
      try {
        let response;
        if (isLoggedin()) {
          response = await axiosInstance.post('api/auth/token', {
            refreshToken: store.getState().userReducer.present.refreshToken,
          });
        }
        if (response && response.status === 200) {
          await store.dispatch(
            setUserTokens({
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
            })
          );
          error.config.headers.Authorization = setAuthHeaderValue();
          return axios.request(error.config);
        }
      } catch (err) {
        await store.dispatch(logoutUser());
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
