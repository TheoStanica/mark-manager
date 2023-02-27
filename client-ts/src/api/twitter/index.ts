import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../index';
import {
  ILikeTweetMutation,
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

    likeTweet: builder.mutation<void, ILikeTweetMutation>({
      query: ({ tweet, twitterStreamData }) => ({
        url: '/favorites/create',
        method: 'POST',
        body: {
          tweetId: tweet.id_str,
          twitterUserId: twitterStreamData.twitterUserId,
        },
      }),
      async onQueryStarted(
        { streamId, twitterStreamData, tweet },
        { dispatch, queryFulfilled }
      ) {
        const postResult = dispatch(
          twitterApi.util.updateQueryData(
            'fetchTweets',
            {
              id: streamId,
              tweet: twitterStreamData,
            },
            (draft) => {
              draft.statuses.map((status) => {
                if (status.id_str === tweet.id_str) {
                  if (status.retweeted_status) {
                    status.retweeted_status.favorite_count =
                      status.retweeted_status.favorite_count + 1;
                    status.retweeted_status.favorited = true;
                  } else {
                    status.favorite_count = status.favorite_count + 1;
                    status.favorited = true;
                  }
                }
                return status;
              });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          postResult.undo();
        }
      },
    }),
  }),
});

export const { useFetchTweetsQuery, useLikeTweetMutation } = twitterApi;
