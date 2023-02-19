import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../index';
import {
  ISearchTweetsQueryRequest,
  ISearchTweetsResponse,
  ISearchTweetsResponseExtended,
} from './types';

export const TWITTER_API_REDUCER_KEY = 'twitterApi';

export const twitterApi = createApi({
  reducerPath: TWITTER_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery({ urlPrefix: 'social/twitter' }),
  tagTypes: ['Tweets'],
  endpoints: (builder) => ({
    fetchTweets: builder.query<
      ISearchTweetsResponseExtended,
      ISearchTweetsQueryRequest
    >({
      query: ({ tweet }) => ({
        url: `/search/tweets`,
        method: 'GET',
        params: {
          twitterUserId: tweet.twitterUserId,
          search: tweet.search,
          maxId: tweet.maxId,
        },
      }),

      serializeQueryArgs: ({ queryArgs, endpointDefinition, endpointName }) => {
        const { id } = queryArgs;
        return id;
      },
      transformResponse: (response: ISearchTweetsResponse) => {
        const data = {
          statuses: response.statuses,
          metadata: {
            maxId: response.statuses[response.statuses.length - 1].id_str,
          },
        };
        return data;
      },
      merge: (currentCache, newItems) => {
        // add a "hasMore" boolean
        newItems.statuses?.shift();
        return {
          statuses: [...currentCache.statuses, ...newItems.statuses],
          metadata: {
            maxId: newItems.metadata.maxId,
          },
        };
      },
    }),
  }),
});

export const { useFetchTweetsQuery } = twitterApi;
