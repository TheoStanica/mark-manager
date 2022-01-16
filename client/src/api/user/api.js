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
    updateUser: builder.mutation({
      query: ({ fullName, email, profilePicture }) => ({
        url: '/currentUser',
        method: 'PUT',
        body: { fullName, email, profilePicture: profilePicture || undefined },
      }),
      invalidatesTags: ['User'],
    }),
    uploadImage: builder.mutation({
      query: ({ image }) => ({
        url: '/uploadimage',
        method: 'POST',
        body: { image },
      }),
    }),
  }),
});

export const {
  useCurrentUserQuery,
  useChangeThemeMutation,
  useUpdateUserMutation,
  useUploadImageMutation,
} = userApi;
