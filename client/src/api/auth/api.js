import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../apiBaseQuery';

export const AUTH_API_REDUCER_KEY = 'authApi';

export const authApi = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery({ urlPrefix: 'auth' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/signin',
        method: 'POST',
        body: { email, password },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/signout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
