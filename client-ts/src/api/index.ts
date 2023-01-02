import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { authSlice } from '../features/auth/redux/slice';

let store: any = null;
const injectStore = (_store: any) => {
  store = _store;
};

const apiInstance = axios.create({
  baseURL: 'https://mark.dev/api',
});

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

const makeRequest = ({ urlPrefix, url, method, data, params }: any) => {
  return apiInstance({
    url: urlPrefix + url,
    method,
    data,
    params,
    headers: {
      Authorization: `Bearer ${store?.getState()?.authSlice.accessToken}`,
    },
  });
};

apiInstance.interceptors.request.use(
  (config: any) => {
    if (store?.getState()?.authSlice.accessToken)
      config.headers.Authorization = `Bearer ${
        store.getState().authSlice.accessToken
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
            agasgasg: 'tes',
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

interface Error {
  message: string;
  [key: string]: any;
}

export interface ApplicationError {
  error: number;
  data:
    | {
        errors: Array<Error>;
      }
    | string;
}

const axiosBaseQuery =
  ({
    urlPrefix,
  }: {
    urlPrefix: string;
  }): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      params?: AxiosRequestConfig['params'];
      body?: any;
    },
    unknown,
    ApplicationError,
    {}
  > =>
  // @ts-ignore
  async ({ url, method, params, body }) => {
    try {
      const result = await makeRequest({
        urlPrefix,
        url,
        method,
        data: body,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export { axiosBaseQuery, injectStore };
