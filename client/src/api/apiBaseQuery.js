import axios from 'axios';
import { authSlice } from '../features/Auth/slice';

let store = null;
const injectStore = (_store) => {
  store = _store;
};

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

<<<<<<< HEAD
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

=======
>>>>>>> fe04bfb (aa)
const makeRequest = ({ urlPrefix, url, method, body, params }) => {
  return apiInstance({
    url: urlPrefix + url,
    method,
    data: body,
    params,
    headers: {
      Authorization: `Bearer ${store.getState().authSlice.accessToken}`,
    },
  });
};

<<<<<<< HEAD
apiInstance.interceptors.request.use(
  (config) => {
    if (store?.getState()?.authSlice.accessToken)
      config.headers.Authorization = `Bearer ${
        store?.getState()?.authSlice.accessToken
      }`;
    return config;
  },
  (error) => Promise.reject(error)
);

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return apiInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        apiInstance
          .post('auth/token', {
            refreshToken: store?.getState()?.authSlice.refreshToken,
          })
          .then(async ({ data }) => {
            store.dispatch(authSlice.actions.update(data));
            originalRequest.headers['Authorization'] =
              'Bearer ' + data.accessToken;
            processQueue(null, data.refreshToken);
            resolve(apiInstance(originalRequest));
          })
          .catch(async (err) => {
            store.dispatch(authSlice.actions.clear());
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(error);
  }
);

=======
>>>>>>> fe04bfb (aa)
const axiosBaseQuery = ({ urlPrefix }) => async ({
  url,
  method,
  body,
  params,
}) => {
  try {
    const result = await makeRequest({ urlPrefix, url, method, body, params });
    return { data: result.data };
  } catch (error) {
<<<<<<< HEAD
    return {
      error: { status: error.response?.status, data: error.response?.data },
    };
=======
    if (error.response && error.response.status === 401) {
      // axios interceptor equivalent
      const refreshResult = await apiInstance.post('auth/token', {
        refreshToken: store?.getState()?.authSlice.refreshToken,
      });
      if (refreshResult.data) {
        store.dispatch(authSlice.actions.update(refreshResult.data));
        const result = await makeRequest({
          urlPrefix,
          url,
          method,
          body,
          params,
        });
        return { data: result.data };
      } else {
        store.dispatch(authSlice.actions.clear());
      }
    } else {
      return {
        error: { status: error.response?.status, data: error.response?.data },
      };
    }
>>>>>>> fe04bfb (aa)
  }
};

export { axiosBaseQuery, injectStore };
