import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../index';
import {
  IAddFacebookAccountPageRequest,
  IBaseFacebookAccountRequest,
  IFacebookAccountPagesPayload,
} from './types';

export const FACEBOOK_REDUCER_KEY = 'facebookApi';

export const facebookApi = createApi({
  reducerPath: FACEBOOK_REDUCER_KEY,
  baseQuery: axiosBaseQuery({ urlPrefix: 'social/facebook' }),
  endpoints: (builder) => ({
    myFacebookAccount: builder.query<unknown, IBaseFacebookAccountRequest>({
      query: ({ facebookUserId }) => ({
        url: '/me',
        method: 'GET',
        params: {
          facebookUserId,
        },
      }),
    }),
    fetchAccountPages: builder.query<
      IFacebookAccountPagesPayload,
      IBaseFacebookAccountRequest
    >({
      query: ({ facebookUserId }) => ({
        url: '/pages',
        method: 'GET',
        params: {
          facebookUserId,
        },
      }),
    }),
    addFacebookAccountPage: builder.mutation<
      undefined,
      IAddFacebookAccountPageRequest
    >({
      query: ({ facebookUserId, access_token, category, name, id }) => ({
        url: '/pages',
        method: 'POST',
        body: {
          facebookUserId,
          access_token,
          category,
          name,
          id,
        },
      }),
    }),
  }),
});

export const { useFetchAccountPagesQuery, useAddFacebookAccountPageMutation } =
  facebookApi;
