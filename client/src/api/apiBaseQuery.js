import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import axios from 'axios';
import { authSlice } from '../features/Auth/slice';

let store = null;
const injectStore = (_store) => {
  store = _store;
};

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

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
    if (error.response && error.response.status === 401) {
      try {
        const refreshResult = await apiInstance.post('auth/token', {
          refreshToken: store?.getState()?.authSlice.refreshToken,
        });
        if (refreshResult.data) {
          store.dispatch(authSlice.actions.update(refreshResult.data));
          try {
            const result = await makeRequest({
              urlPrefix,
              url,
              method,
              body,
              params,
            });
            return { data: result.data };
          } catch {}
        }
      } catch {
        store.dispatch(authSlice.actions.clear());
      }
    } else {
      return {
        error: { status: error.response?.status, data: error.response?.data },
      };
    }
  }
};

export { axiosBaseQuery, injectStore };
