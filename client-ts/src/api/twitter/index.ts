import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../index';
import {
  ILikeTweetMutation,
  IRetweetTweetMutation,
  ISearchTweetsQueryRequest,
  ISearchTweetsResponseExtended,
  ITweetRequest,
} from './types';

export const TWITTER_API_REDUCER_KEY = 'twitterApi';

export const twitterApi = createApi({
  reducerPath: TWITTER_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery({ urlPrefix: 'social/twitter/v2' }),
  tagTypes: ['Tweets'],
  endpoints: (builder) => ({
    fetchTweets: builder.query<
      ISearchTweetsResponseExtended,
      ISearchTweetsQueryRequest
    >({
      query: ({ tweet }) => {
        const url =
          tweet.type === 'search'
            ? '/search/tweets'
            : '/statuses/home_timeline';
        return {
          url,
          method: 'GET',
          params: {
            twitterUserId: tweet.twitterUserId,
            search: tweet.search,
            maxId: tweet.maxId,
          },
        };
      },

      serializeQueryArgs: ({ queryArgs, endpointDefinition, endpointName }) => {
        const { id } = queryArgs;
        return id;
      },

      merge: (currentCache, newItems) => {
        const combinedUsers = new Set([
          ...(currentCache._realData.includes.users || []),
          ...(newItems._realData.includes.users || []),
        ]);
        const combinedIncludedTweets = new Set([
          ...(currentCache._realData.includes.tweets || []),
          ...(newItems._realData.includes.tweets || []),
        ]);
        const combinedIncludedMedia = new Set([
          ...(currentCache._realData.includes.media || []),
          ...(newItems._realData.includes.media || []),
        ]);

        return {
          _realData: {
            data: [...currentCache._realData.data, ...newItems._realData.data],
            includes: {
              users: Array.from(combinedUsers),
              tweets: Array.from(combinedIncludedTweets),
              media: Array.from(combinedIncludedMedia),
            },
            meta: newItems._realData.meta,
          },
        };
      },
    }),

    likeTweet: builder.mutation<void, ILikeTweetMutation>({
      query: ({ tweet, twitterStreamData }) => {
        // cant yet determine if favorited or not using V2 API and the current routes
        const isFavorited = false;

        const pathSuffix = isFavorited ? 'destroy' : 'create';

        return {
          url: `/favorites/${pathSuffix}`,
          method: 'POST',
          body: {
            tweetId: tweet.id,
            twitterUserId: twitterStreamData.twitterUserId,
          },
        };
      },
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
              draft._realData.data.map((status) => {
                if (status.id === tweet.id) {
                  status.public_metrics.like_count += 1;
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
    retweetTweet: builder.mutation<void, IRetweetTweetMutation>({
      query: ({ tweet, twitterStreamData }) => {
        const isRetweeted = false;
        const pathSuffix = isRetweeted ? 'unretweet' : 'retweet';

        return {
          url: `/statuses/${pathSuffix}`,
          method: 'POST',
          body: {
            tweetId: tweet.id,
            twitterUserId: twitterStreamData.twitterUserId,
          },
        };
      },
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
              draft._realData.data.map((status) => {
                if (status.id === tweet.id) {
                  status.public_metrics.retweet_count += 1;
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
    tweetMessage: builder.mutation<void, ITweetRequest>({
      query: ({ status, twitterUserId, inReplyToStatusId }) => ({
        url: '/statuses/update',
        method: 'POST',
        body: { status, twitterUserId, inReplyToStatusId },
      }),
    }),
  }),
});

export const {
  useFetchTweetsQuery,
  useLikeTweetMutation,
  useRetweetTweetMutation,
  useTweetMessageMutation,
} = twitterApi;
