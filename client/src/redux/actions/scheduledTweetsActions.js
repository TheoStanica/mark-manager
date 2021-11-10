import axiosInstance from '../../api/buildClient';
import {
  SET_ERRORS,
  TWITTER_ADD_SCHEDULED_TWEETS,
  TWITTER_CLEAR_SCHEDULED_TWEETS,
  TWITTER_REMOVE_SCHEDULED_TWEET,
  TWITTER_SET_SCHEDULED_TWEETS_LOADING,
  TWITTER_UPDATE_SCHEDULED_TWEET,
} from '../types';

import { twitterAdsEndpoints } from '../../services/adsEndpoints';
import { getUserInfo } from './userActions';
import { store } from '../store';

export const fetchScheduledTweets = () => async (dispatch) => {
  try {
    await dispatch(setScheduledTweetsLoadingStatus({ isLoading: true }));
    await dispatch(clearScheduledTweets());

    await dispatch(getUserInfo());
    const users = getMediaAccounts();

    await Promise.all(
      users.map(async (user) => {
        await dispatch(fetchUserScheduledTweets({ twitterUserId: user }));
      })
    );

    await dispatch(setScheduledTweetsLoadingStatus({ isLoading: false }));
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const fetchUserScheduledTweets = ({ twitterUserId }) => async (
  dispatch
) => {
  try {
    let cursor = null;
    do {
      const response = await axiosInstance.get(
        twitterAdsEndpoints.scheduledTweets,
        {
          params: {
            twitterUserId,
            cursor,
          },
        }
      );
      cursor = response.data.next_cursor;

      if (cursor) {
        const {
          scheduledTweets,
          scheduledTweetsById,
        } = processScheduledTweetsResponse(response.data.data, twitterUserId);

        await dispatch(
          addScheduledTweets({
            scheduledTweets,
            scheduledTweetsById,
            nextCursor: cursor,
            twitterUserId,
          })
        );
      }
    } while (cursor !== null);
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const createScheduledTweet = ({
  twitterUserId,
  text,
  scheduleAt,
}) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(
      twitterAdsEndpoints.scheduledTweets,
      {
        twitterUserId,
        scheduleAt: processDate(scheduleAt),
        text,
      }
    );
    const {
      scheduledTweets,
      scheduledTweetsById,
    } = processScheduledTweetsResponse([response.data.data], twitterUserId);

    await dispatch(
      addScheduledTweets({
        scheduledTweets,
        scheduledTweetsById,
        twitterUserId,
      })
    );
  } catch (error) {
    dispatch(handleError({ error }));
  }
};

export const updateScheduledTweet = ({
  twitterUserId,
  scheduledTweetId,
  scheduleAt,
  text,
}) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(
      twitterAdsEndpoints.scheduledTweets,
      {
        twitterUserId,
        scheduledTweetId,
        scheduleAt: processDate(scheduleAt),
        text,
      }
    );

    const tweet = response.data.data;

    dispatch(
      updateTweet({
        twitterUserId,
        scheduledTweetId: tweet.id_str,
        scheduleAt: tweet.scheduled_at,
        text: tweet.text,
      })
    );
  } catch (error) {
    dispatch(handleError({ error }));
  }
};

export const removeScheduledTweet = ({
  twitterUserId,
  scheduledTweetId,
}) => async (dispatch) => {
  try {
    await axiosInstance.delete(twitterAdsEndpoints.scheduledTweets, {
      params: {
        twitterUserId,
        scheduledTweetId,
      },
    });

    dispatch(
      removeTweet({
        scheduledTweetId,
      })
    );
  } catch (error) {
    dispatch(handleError({ error }));
  }
};

const handleError = ({ error }) => async (dispatch) => {
  console.log(error);
  if (error?.response?.data?.errors) {
    dispatch({
      type: SET_ERRORS,
      payload: {
        errors: error.response.data.errors,
      },
    });
  } else {
    dispatch({
      type: SET_ERRORS,
      payload: {
        errors: [{ message: 'Something went wrong' }],
      },
    });
  }
};

const setScheduledTweetsLoadingStatus = ({ isLoading }) => {
  return {
    type: TWITTER_SET_SCHEDULED_TWEETS_LOADING,
    payload: {
      isLoading,
    },
  };
};

const clearScheduledTweets = () => {
  return {
    type: TWITTER_CLEAR_SCHEDULED_TWEETS,
  };
};

const addScheduledTweets = ({
  scheduledTweets,
  scheduledTweetsById,
  nextCursor,
  twitterUserId,
}) => {
  return {
    type: TWITTER_ADD_SCHEDULED_TWEETS,
    payload: {
      scheduledTweets,
      scheduledTweetsById,
      nextCursor,
      twitterUserId,
    },
  };
};

const updateTweet = ({ twitterUserId, scheduledTweetId, scheduleAt, text }) => {
  return {
    type: TWITTER_UPDATE_SCHEDULED_TWEET,
    payload: {
      twitterUserId,
      scheduledTweetId,
      scheduleAt,
      text,
    },
  };
};

const removeTweet = ({ scheduledTweetId }) => {
  return {
    type: TWITTER_REMOVE_SCHEDULED_TWEET,
    payload: {
      scheduledTweetId,
    },
  };
};

const getMediaAccounts = () => {
  const potentialUsers = store.getState().twitterReducer.twitterAccounts;
  const users = potentialUsers.filter(
    (user) =>
      store.getState().twitterReducer.twitterAccountsById[user]
        .hasAdsAccount === true
  );
  return users;
};

const processScheduledTweetsResponse = (tweets, twitterUserId) => {
  const scheduledTweets = tweets.map((scheduledTweet) => scheduledTweet.id_str);
  const scheduledTweetsById = tweets.reduce(
    (obj, scheduledTweet) => ({
      ...obj,
      [scheduledTweet.id_str]: {
        ...scheduledTweet,
        twitterUserId,
      },
    }),
    {}
  );
  return { scheduledTweets, scheduledTweetsById };
};

const processDate = (date) => {
  return date.toISOString().split('.')[0] + 'Z';
};
