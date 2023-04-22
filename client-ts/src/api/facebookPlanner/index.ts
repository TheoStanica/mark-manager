import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '..';
import {
  ICreateScheduledFacebookPostRequest,
  IDeleteScheduledFacebookPostRequest,
  IFacebookPlannerPostsResponse,
  IUpdateScheduledFacebookPostRequest,
} from './types';

export const FACEBOOK_PLANNER_API_REDUCER_KEY = 'facebookPlannerApi';

export const facebookPlannerApi = createApi({
  reducerPath: FACEBOOK_PLANNER_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery({ urlPrefix: 'social/facebook/schedule' }),
  tagTypes: ['FacebookPlannedPosts'],
  endpoints: (builder) => ({
    fetchFacebookPosts: builder.query<IFacebookPlannerPostsResponse, void>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
      providesTags: ['FacebookPlannedPosts'],
    }),
    scheduleFacebookPost: builder.mutation<
      void,
      ICreateScheduledFacebookPostRequest
    >({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['FacebookPlannedPosts'],
    }),
    updateFacebookPost: builder.mutation<
      void,
      IUpdateScheduledFacebookPostRequest
    >({
      query: (data) => ({
        url: '/',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['FacebookPlannedPosts'],
    }),
    deleteFacebookPost: builder.mutation<
      void,
      IDeleteScheduledFacebookPostRequest
    >({
      query: (data) => ({
        url: '/',
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['FacebookPlannedPosts'],
    }),
  }),
});

export const {
  useFetchFacebookPostsQuery,
  useScheduleFacebookPostMutation,
  useUpdateFacebookPostMutation,
  useDeleteFacebookPostMutation,
} = facebookPlannerApi;
