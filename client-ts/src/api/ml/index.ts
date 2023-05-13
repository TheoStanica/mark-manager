import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../index';
import {
  ISentimentRequest,
  ISentimentResponse,
  ISummaryRequest,
} from './types';

export const ML_REDUCER_KEY = 'MlApi';

export const mlApi = createApi({
  reducerPath: ML_REDUCER_KEY,
  baseQuery: axiosBaseQuery({ urlPrefix: 'ml' }),
  endpoints: (builder) => ({
    getSentiment: builder.mutation<ISentimentResponse, ISentimentRequest>({
      query: ({ message }) => ({
        url: '/sentiment',
        method: 'POST',
        body: {
          message,
        },
      }),
    }),
    getSummary: builder.mutation<string[], ISummaryRequest>({
      query: ({ message }) => ({
        url: '/summarize',
        method: 'POST',
        body: {
          message,
        },
      }),
    }),
  }),
});

export const { useGetSentimentMutation, useGetSummaryMutation } = mlApi;
