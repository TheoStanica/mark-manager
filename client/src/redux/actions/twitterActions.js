import axiosInstance from '../../api/buildClient';
import {
  SET_ERRORS,
  TWITTER_ADD_MORE_TWEETS,
  TWITTER_ADD_STREAM,
  TWITTER_CLEAR_ALL_STREAMS,
  TWITTER_SET_STREAM_LOADING_STATUS,
  TWITTER_SET_STREAM_TWEETS,
  TWITTER_UPDATE_STREAMS,
  USER_SET_MESSAGES,
  TWITTER_ADD_MULTIPLE_STREAMS,
  TWITTER_REMOVE_STREAM,
  TWITTER_ADD_MULTIPLE_ACCOUNTS,
  TWITTER_CLEAR_ALL_ACCOUNTS,
  TWITTER_SET_ACCOUNT_DATA,
} from '../types';
import { store } from '../store';
import { v4 as uuidv4 } from 'uuid';
import { shallowEqual } from 'react-redux';

const handleError = ({ error }) => async (dispatch) => {
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

export const fetchTwitterAccountsData = () => async (dispatch) => {
  try {
    const accounts = store.getState().twitterReducer.twitterAccounts;
    accounts.forEach(async (account) => {
      await dispatch(fetchTwitterAccountData({ twitterUserId: account }));
    });
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const fetchTwitterAccountData = ({ twitterUserId }) => async (
  dispatch
) => {
  try {
    const accountData = await axiosInstance.get(
      `/api/social/twitter/user?twitterUserId=${twitterUserId}`
    );
    if (accountData) {
      await dispatch({
        type: TWITTER_SET_ACCOUNT_DATA,
        payload: {
          id: accountData.data.id_str,
          name: accountData.data.name,
          screenName: accountData.data.screen_name,
          profileImage: accountData.data.profile_image_url_https,
        },
      });
    }
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const fetchTwitterAccounts = () => async (dispatch) => {
  try {
    const accounts = await axiosInstance.get('/api/social/twitter/accounts');
    if (accounts) {
      const storedAccountsArray = store.getState().twitterReducer
        .twitterAccounts;
      const accountsArray = accounts.data.map(
        (account) => account.twitterUserId
      );
      const synced = shallowEqual(accountsArray, storedAccountsArray);
      if (!synced) {
        const accountsById = accounts.data.reduce(
          (obj, account) => ({
            ...obj,
            [account.twitterUserId]: { ...account },
          }),
          {}
        );
        await dispatch({
          type: TWITTER_CLEAR_ALL_ACCOUNTS,
        });
        await dispatch({
          type: TWITTER_ADD_MULTIPLE_ACCOUNTS,
          payload: {
            accounts: accountsArray,
            accountsById: accountsById,
          },
        });
      }
      await dispatch(fetchTwitterAccountsData());
    }
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const connectToTwitter = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get('/api/auth/twitter/connect');
    if (res) {
      window.location.assign(
        `https://twitter.com/oauth/authorize?oauth_token=${res.data.requestToken}`
      );
    }
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const tweetNewMessage = ({ message }) => async (dispatch) => {
  try {
    await axiosInstance.post('/api/social/twitter/statuses/update', {
      status: message,
    });
    dispatch({
      type: USER_SET_MESSAGES,
      payload: {
        message: 'Tweet was posted!',
      },
    });
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const updateStreams = ({ streams }) => async (dispatch) => {
  await dispatch({
    type: TWITTER_UPDATE_STREAMS,
    payload: {
      streams: streams,
    },
  });
};

export const updateUserStreamsBackend = ({ streams }) => async (dispatch) => {
  try {
    const streamsById = store.getState().twitterReducer.streamsById;
    const updatedstreams = streams.map((stream) => {
      const s = streamsById[stream];
      return {
        id: s.id,
        type: s.type,
        search: s.search ? s.search : undefined,
        twitterUserId: s.twitterUserId,
      };
    });
    await axiosInstance.post('/api/user/streampreferences', {
      stream_preferences: updatedstreams,
    });
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const addStream = ({ twitterUserId, type, search }) => async (
  dispatch
) => {
  try {
    await dispatch({
      type: TWITTER_ADD_STREAM,
      payload: {
        id: uuidv4(),
        type: type,
        search: search ? search : undefined,
        twitterUserId: twitterUserId,
      },
    });
    const { streams } = store.getState().twitterReducer;
    await dispatch(updateUserStreamsBackend({ streams }));
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const clearAllStreams = () => async (dispatch) => {
  dispatch({
    type: TWITTER_CLEAR_ALL_STREAMS,
  });
};

export const removeStream = ({ id }) => async (dispatch) => {
  try {
    const { streams } = store.getState().twitterReducer;
    const newStreams = streams.filter((s) => s !== id);
    await dispatch(updateUserStreamsBackend({ streams: newStreams }));
    dispatch({
      type: TWITTER_REMOVE_STREAM,
      payload: {
        id: id,
      },
    });
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const reorderStreams = ({ streams }) => async (dispatch) => {
  try {
    await dispatch(updateStreams({ streams }));
    await dispatch(updateUserStreamsBackend({ streams: streams }));
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const setStreamLoading = ({ id, isLoading }) => (dispatch) => {
  dispatch({
    type: TWITTER_SET_STREAM_LOADING_STATUS,
    payload: {
      id: id,
      isLoading: isLoading,
    },
  });
};

export const loadTweetSearchStream = ({ id, search, twitterUserId }) => async (
  dispatch
) => {
  try {
    await dispatch(setStreamLoading({ id, isLoading: true }));
    const response = await axiosInstance.get(
      `/api/social/twitter/search/tweets?search=${search}&twitterUserId=${twitterUserId}`
    );
    await dispatch({
      type: TWITTER_SET_STREAM_TWEETS,
      payload: {
        id: id,
        tweets: response.data.statuses,
        metadata: {
          max_id: response.data.statuses[response.data.statuses.length - 1].id,
        },
      },
    });
    await dispatch(setStreamLoading({ id, isLoading: false }));
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const loadMoreTweetSearchStream = ({
  id,
  search,
  maxId,
  twitterUserId,
}) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(
      `/api/social/twitter/search/tweets?search=${search}&maxId=${maxId}&twitterUserId=${twitterUserId}`
    );
    await dispatch({
      type: TWITTER_ADD_MORE_TWEETS,
      payload: {
        id: id,
        tweets: response.data.statuses.slice(1),
        metadata: {
          max_id: response.data.statuses[response.data.statuses.length - 1].id,
        },
      },
    });
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const loadHomeTimelineStream = ({ id, twitterUserId }) => async (
  dispatch
) => {
  try {
    await dispatch(setStreamLoading({ id, isLoading: true }));
    const response = await axiosInstance.get(
      `/api/social/twitter/statuses/home_timeline?twitterUserId=${twitterUserId}`
    );
    await dispatch({
      type: TWITTER_SET_STREAM_TWEETS,
      payload: {
        id: id,
        tweets: response.data,
        metadata: {
          max_id: response.data[response.data.length - 1].id,
        },
      },
    });
    await dispatch(setStreamLoading({ id, isLoading: false }));
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const loadMoreHomeTimelineStream = ({
  id,
  maxId,
  twitterUserId,
}) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(
      `/api/social/twitter/statuses/home_timeline?maxId=${maxId}&twitterUserId=${twitterUserId}`
    );
    await dispatch({
      type: TWITTER_ADD_MORE_TWEETS,
      payload: {
        id: id,
        //remove first tweet as it is the same as the last one in our tweets array in redux
        tweets: response.data.slice(1),
        metadata: {
          max_id: response.data[response.data.length - 1].id,
        },
      },
    });
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const loadUserStreams = ({ streams }) => async (dispatch) => {
  try {
    const storedStreamsArray = store.getState().twitterReducer.streams;
    let synced = true;

    const streamsArray = streams.map((stream, idx) => {
      if (stream.id !== storedStreamsArray[idx]) {
        synced = false;
      }
      return stream.id;
    });
    if (!synced) {
      await dispatch(clearAllStreams());
      const updatedStreamsById = streams.reduce(
        (obj, stream) => ({ ...obj, [stream.id]: { ...stream } }),
        {}
      );
      await dispatch({
        type: TWITTER_ADD_MULTIPLE_STREAMS,
        payload: {
          streams: streamsArray,
          streamsById: updatedStreamsById,
        },
      });
    }
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};
