import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../apiBaseQuery';

export const TWITTER_API_REDUCER_KEY = 'twitterApi';

export const twitterApi = createApi({
  reducerPath: TWITTER_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery({ urlPrefix: 'social/twitter' }),
  tagTypes: ['Twitter', 'Twitter Accounts'],
  endpoints: (builder) => ({
    fetchConnectedAccounts: builder.query({
      query: () => ({
        url: '/accounts',
        method: 'GET',
      }),
      providesTags: ['Twitter Accounts'],
    }),
  }),
});

export const { useFetchConnectedAccountsQuery } = twitterApi;
