import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '..';
import { ITwitterPlannerPostsResponse } from './types';

export const TWITTER_PLANNER_API_REDUCER_KEY = 'twitterPlannerApi';

export const twitterPlannerApi = createApi({
  reducerPath: TWITTER_PLANNER_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery({ urlPrefix: 'social/twitter/schedule' }),
  tagTypes: ['TwitterPlannedPosts'],
  endpoints: (builder) => ({
    fetchTwitterPosts: builder.query<ITwitterPlannerPostsResponse, void>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
      providesTags: ['TwitterPlannedPosts'],
    }),
  }),
});

export const { useFetchTwitterPostsQuery } = twitterPlannerApi;
