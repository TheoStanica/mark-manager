import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../index';
import { IBuildPlannerMessageRequest, ISuggestedPostsResponse } from './types';

export const ASSISTANT_REDUCER_KEY = 'AssistantApi';

export const assistantApi = createApi({
  reducerPath: ASSISTANT_REDUCER_KEY,
  baseQuery: axiosBaseQuery({ urlPrefix: 'social/assistant' }),
  endpoints: (builder) => ({
    suggestPosts: builder.mutation<
      ISuggestedPostsResponse,
      IBuildPlannerMessageRequest
    >({
      query: ({ topic, end_date, number_of_posts, start_date, timezone }) => ({
        url: '/plan',
        method: 'POST',
        body: {
          topic,
          number_of_posts,
          start_date,
          end_date,
          timezone,
        },
      }),
    }),
  }),
});

export const { useSuggestPostsMutation } = assistantApi;
