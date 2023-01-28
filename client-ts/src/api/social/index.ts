import { createApi } from '@reduxjs/toolkit/query/react';
import { IConnectedAccount } from '../../core/types/social';
import { axiosBaseQuery } from '../index';

export const TWITTER_API_REDUCER_KEY = 'twitterApi';

export const socialApi = createApi({
  reducerPath: TWITTER_API_REDUCER_KEY,
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
