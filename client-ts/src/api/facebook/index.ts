import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../index';
import {
  IAddFacebookAccountPageRequest,
  IBaseFacebookAccountRequest,
  IFacebookAccountPagesPayload,
  IFacebookPageFeedReqestExtended,
  IFacebookPageFeedResponsePayload,
  IPostMessageRequest,
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

    postMessage: builder.mutation<void, IPostMessageRequest>({
      query: ({ facebookUserId, message, pageId }) => ({
        url: '/post',
        method: 'POST',
        body: { facebookUserId, message, pageId },
      }),
    }),

    fetchPosts: builder.query<
      IFacebookPageFeedResponsePayload,
      IFacebookPageFeedReqestExtended
    >({
      query: ({ facebookUserId, pageId, after, before }) => {
        const url = '/pages/feed';
        return {
          url,
          method: 'GET',
          params: {
            facebookUserId,
            pageId,
            after,
            before,
          },
        };
      },

      serializeQueryArgs: ({ queryArgs, endpointDefinition, endpointName }) => {
        const { id } = queryArgs;
        return id;
      },

      merge: (currentCache, newItems) => {
        console.log(
          'my current cache',
          currentCache.data.length,
          newItems.data.length
        );
        return {
          data: [...currentCache.data, ...newItems.data],
          paging: newItems.paging,
        };
      },
    }),
  }),
});

export const {
  useFetchAccountPagesQuery,
  useAddFacebookAccountPageMutation,
  useFetchPostsQuery,
  usePostMessageMutation,
} = facebookApi;
