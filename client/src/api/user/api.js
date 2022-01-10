import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../apiBaseQuery';

export const USER_API_REDUCER_KEY = 'userApi';

export const userApi = createApi({
  reducerPath: USER_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery({ urlPrefix: 'user' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    currentUser: builder.query({
      query: () => ({
        url: '/currentuser',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
});

export const { useCurrentUserQuery } = userApi;
