import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../index';
import { IFacebookAccountPagesPayload } from './types';

export const FACEBOOK_REDUCER_KEY = 'facebookApi';

export const facebookApi = createApi({
  reducerPath: FACEBOOK_REDUCER_KEY,
  baseQuery: axiosBaseQuery({ urlPrefix: 'social/facebook' }),
  endpoints: (builder) => ({
    myFacebookAccount: builder.query({
      query: () => ({
        url: '/me',
        method: 'GET',
      }),
    }),
    fetchAccountPages: builder.query<IFacebookAccountPagesPayload, void>({
      query: () => ({
        url: '/pages',
        method: 'GET',
      }),
    }),
  }),
});

export const { useFetchAccountPagesQuery } = facebookApi;
