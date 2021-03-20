import axiosInstance from '../../api/buildClient';
import {
  SET_ERRORS,
  TWITTER_ADD_STREAM,
  TWITTER_RESET_PROFILE_INFO,
  TWITTER_SET_HOME_TIMELINE_TWEETS,
  TWITTER_SET_PROFILE_INFO,
  TWITTER_SET_STREAM_LOADING_STATUS,
  TWITTER_SET_STREAM_TWEETS,
  TWITTER_UPDATE_STREAMS,
  USER_SET_MESSAGES,
} from '../types';
import { store } from '../store';

const handleError = ({ error }) => async (dispatch) => {
  if (
    error &&
    error.resposne &&
    error.response.data &&
    error.response.data.errors
  ) {
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

const getRandomID = () => {
  return Math.floor(Math.random() * 1000000000);
};

export const getTwitterProfileInfoData = () => async (dispatch) => {
  try {
    const user = await axiosInstance.get('/api/social/twitter/user');
    if (user) {
      dispatch({
        type: TWITTER_SET_PROFILE_INFO,
        payload: {
          name: user.data.name,
          screenName: user.data.screen_name,
          profileImage: user.data.profile_image_url,
        },
      });
    }
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};
export const getTwitterDefaultData = () => async (dispatch) => {
  try {
    const user = await axiosInstance.get('/api/social/twitter/user');
    if (user) {
      const response = await axiosInstance.get(
        '/api/social/twitter/statuses/home_timeline'
      );
      dispatch({
        type: TWITTER_SET_PROFILE_INFO,
        payload: {
          name: user.data.name,
          screenName: user.data.screen_name,
          profileImage: user.data.profile_image_url,
        },
      });
      if (response) {
        dispatch({
          type: TWITTER_SET_HOME_TIMELINE_TWEETS,
          payload: {
            tweets: response.data,
          },
        });
      }
    }
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const clearTwitterProfileInfoData = () => async (dispatch) => {
  dispatch({
    type: TWITTER_RESET_PROFILE_INFO,
  });
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

export const getTwitterHomeTimeline = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get(
      '/api/social/twitter/statuses/home_timeline'
    );
    if (response) {
      dispatch({
        type: TWITTER_SET_HOME_TIMELINE_TWEETS,
        payload: {
          tweets: response.data,
        },
      });
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
    const updatedstreams = [...streams].map((stream) => ({
      id: stream.id,
      type: stream.type,
      search: stream.search ? stream.search : undefined,
      isLoading: undefined,
      tweets: undefined,
    }));
    await axiosInstance.post('/api/user/streampreferences', {
      stream_preferences: updatedstreams,
    });
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const addStream = ({ type, search }) => async (dispatch) => {
  try {
    await dispatch({
      type: TWITTER_ADD_STREAM,
      payload: {
        id: getRandomID(),
        type: type,
        search: search ? search : undefined,
        isLoading: true,
        tweets: [],
      },
    });
    const { streams } = store.getState().twitterReducer;
    await dispatch(updateUserStreamsBackend({ streams }));
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};
    }
  }
};
