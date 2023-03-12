import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '..';
import {
  ICreateScheduledTwitterPostRequest,
  IDeleteScheduledTweetPostRequest,
  ITwitterPlannerPostsResponse,
  IUpdateScheduledTweetPostRequest,
} from './types';

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
    scheduleTwitterPost: builder.mutation<
      void,
      ICreateScheduledTwitterPostRequest
    >({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['TwitterPlannedPosts'],
    }),
    updateTwitterPost: builder.mutation<void, IUpdateScheduledTweetPostRequest>(
      {
        query: (data) => ({
          url: '/',
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['TwitterPlannedPosts'],
      }
    ),
    deleteTwitterPost: builder.mutation<void, IDeleteScheduledTweetPostRequest>(
      {
        query: (data) => ({
          url: '/',
          method: 'DELETE',
          body: data,
        }),
        invalidatesTags: ['TwitterPlannedPosts'],
      }
    ),
  }),
});

export const {
  useFetchTwitterPostsQuery,
  useScheduleTwitterPostMutation,
  useUpdateTwitterPostMutation,
  useDeleteTwitterPostMutation,
} = twitterPlannerApi;
