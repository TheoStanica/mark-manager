import axiosInstance from '../../api/buildClient';
import {
  SET_ERRORS,
  TWITTER_ADD_SCHEDULED_TWEETS,
  TWITTER_CLEAR_SCHEDULED_TWEETS,
  TWITTER_SET_SCHEDULED_TWEETS_LOADING,
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
        twitterAdsEndpoints.fetchScheduledTweets,
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
export const setScheduledTweetsLoadingStatus = ({ isLoading }) => {
  return {
    type: TWITTER_SET_SCHEDULED_TWEETS_LOADING,
    payload: {
      isLoading,
    },
  };
};

export const clearScheduledTweets = () => {
  return {
    type: TWITTER_CLEAR_SCHEDULED_TWEETS,
  };
};

export const addScheduledTweets = ({
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
