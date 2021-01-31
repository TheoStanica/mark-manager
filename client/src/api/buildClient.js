import axios from 'axios';
import { logoutUser } from '../redux/actions/userActions';
import { store } from '../redux/store';
import { isLoggedin } from '../services/isLoggedIn';

const setAuthHeaderValue = () => {
  return `Bearer ${localStorage.getItem('accessToken')}`;
};
const setToken = (tokenName, value) => {
  return localStorage.setItem(tokenName, value);
};
const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'Application/json',
    Authorization: setAuthHeaderValue(),
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
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
            refreshToken: localStorage.getItem('refreshToken'),
          });
        }
        if (response && response.status === 200) {
          setToken('accessToken', response.data.accessToken);
          setToken('refreshToken', response.data.refreshToken);
          error.config.headers.Authorization = setAuthHeaderValue();
          return axios.request(error.config);
        }
      } catch (err) {
        clearTokens();
        await store.dispatch(logoutUser());
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
