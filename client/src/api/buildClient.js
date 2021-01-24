import axios from 'axios';
import { setUserTokens } from '../redux/actions/userActions';
import { store } from '../redux/store';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'Application/json',
    Authorization: `Bearer ${store.getState().userReducer.accessToken}`,
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.config && error.response && error.response.status === 401) {
      try {
        const response = await axiosInstance.post('api/auth/token', {
          refreshToken: store.getState().userReducer.refreshToken,
        });
        if (response.status === 200) {
          store.dispatch(
            setUserTokens({
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
            })
          );
          axiosInstance.defaults.headers.Authorization = `Bearer ${
            store.getState().userReducer.accessToken
          }`;
          error.config.headers.Authorization = `Bearer ${
            store.getState().userReducer.accessToken
          }`;
        }
        return axios.request(error.config);
      } catch (err) {
        localStorage.clear();
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
