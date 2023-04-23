import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../index';
import {
  ILikeTweetMutation,
  IRetweetTweetMutation,
  ISearchTweetsQueryRequest,
  ISearchTweetsResponse,
  ISearchTweetsResponseExtended,
  ITweetRequest,
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
      query: ({ tweet, twitterStreamData }) => {
        const isRetweet = tweet.retweeted_status !== undefined;
        const isFavorited = isRetweet
          ? tweet.retweeted_status!.favorited
          : tweet.favorited;
        const pathSuffix = isFavorited ? 'destroy' : 'create';

        return {
          url: `/favorites/${pathSuffix}`,
          method: 'POST',
          body: {
            tweetId: tweet.id_str,
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
              draft.statuses.map((status) => {
                const isRetweet = status.retweeted_status !== undefined;
                const isSameTweet = status.id_str === tweet.id_str;

                if (isSameTweet) {
                  const tweetToModify = isRetweet
                    ? status.retweeted_status!
                    : status;
                  const wasFavorited = tweetToModify.favorited;

                  tweetToModify.favorite_count += wasFavorited ? -1 : 1;
                  tweetToModify.favorited = !wasFavorited;
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
        const isRetweet = tweet.retweeted_status !== undefined;
        const isRetweeted = isRetweet
          ? tweet.retweeted_status!.retweeted
          : tweet.retweeted;
        const pathSuffix = isRetweeted ? 'unretweet' : 'retweet';

        return {
          url: `/statuses/${pathSuffix}`,
          method: 'POST',
          body: {
            tweetId: tweet.id_str,
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
              draft.statuses.map((status) => {
                const isRetweet = status.retweeted_status !== undefined;
                const isSameTweet = status.id_str === tweet.id_str;

                if (isSameTweet) {
                  const tweetToModify = isRetweet
                    ? status.retweeted_status!
                    : status;
                  const wasRetweeted = tweetToModify.retweeted;

                  tweetToModify.retweet_count += wasRetweeted ? -1 : 1;
                  tweetToModify.retweeted = !wasRetweeted;
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
