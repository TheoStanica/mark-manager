import { createApi } from '@reduxjs/toolkit/query/react';
import { IConnectedAccount } from '../../core/types/social';
import { axiosBaseQuery } from '../index';

export const SOCIAL_REDUCER_KEY = 'socialApi';

export const socialApi = createApi({
  reducerPath: SOCIAL_REDUCER_KEY,
  baseQuery: axiosBaseQuery({ urlPrefix: 'social' }),
  tagTypes: ['Connected Accounts'],
  endpoints: (builder) => ({
    fetchConnectedAccounts: builder.query<
      Array<IConnectedAccount<unknown>>,
      void
    >({
      query: () => ({
        url: '/accounts',
        method: 'GET',
      }),
      providesTags: ['Connected Accounts'],
    }),
  }),
});

export const { useFetchConnectedAccountsQuery } = socialApi;
