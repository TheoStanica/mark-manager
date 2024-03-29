import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../index';
import {
  ILoginMutation,
  ILoginMutationResponse,
  IRegisterMutation,
  IResendActivation,
  IResetPassword,
} from './types';

export const AUTH_API_REDUCER_KEY = 'authApi';

export const authApi = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery({ urlPrefix: 'auth' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation<ILoginMutationResponse, ILoginMutation>({
      query: ({ email, password }) => ({
        url: '/signin',
        method: 'POST',
        body: { email, password },
      }),
    }),
    register: builder.mutation<void, IRegisterMutation>({
      query: ({ email, password }) => ({
        url: '/signup',
        method: 'POST',
        body: { email, password },
      }),
    }),
    resendActivation: builder.mutation<void, IResendActivation>({
      query: ({ email }) => ({
        url: '/activation/resend',
        method: 'POST',
        body: { email },
      }),
    }),
    activate: builder.mutation({
      query: ({ activationToken }) => ({
        url: '/activation',
        method: 'POST',
        body: { activationToken },
      }),
    }),
    resetPasswordRequest: builder.mutation<void, IResetPassword>({
      query: ({ email }) => ({
        url: '/resetpassword',
        method: 'POST',
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ password, token }) => ({
        url: `/resetpassword/${token}`,
        method: 'POST',
        body: { password },
      }),
    }),
    changePassword: builder.mutation({
      query: ({ currentPassword, newPassword }) => ({
        url: '/changepassword',
        method: 'PUT',
        body: { currentPassword, newPassword },
      }),
    }),
    connectTwitter: builder.query({
      query: () => ({
        url: '/twitter/connect',
        method: 'GET',
      }),
    }),
    connectFacebook: builder.query({
      query: () => ({
        url: '/facebook/connect',
        method: 'GET',
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

export const {
  useLoginMutation,
  useRegisterMutation,
  useResendActivationMutation,
  useActivateMutation,
  useResetPasswordRequestMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useConnectTwitterQuery,
  useConnectFacebookQuery,
  useLogoutMutation,
} = authApi;
