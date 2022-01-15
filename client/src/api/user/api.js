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
    changeTheme: builder.mutation({
      query: ({ themePreference }) => ({
        url: '/currentuser',
        method: 'PUT',
        body: { themePreference },
      }),
      async onQueryStarted({ themePreference }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userApi.util.updateQueryData('currentUser', undefined, (draft) => {
            draft.user.themePreference = themePreference;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useCurrentUserQuery, useChangeThemeMutation } = userApi;
