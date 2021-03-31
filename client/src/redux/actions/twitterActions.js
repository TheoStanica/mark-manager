import axiosInstance from '../../api/buildClient';
import {
  SET_ERRORS,
  TWITTER_ADD_MORE_TWEETS,
  TWITTER_ADD_STREAM,
  TWITTER_CLEAR_STREAMSBYID,
  TWITTER_REMOVE_STREAMBYID,
  TWITTER_RESET_PROFILE_INFO,
  TWITTER_SET_HOME_TIMELINE_TWEETS,
  TWITTER_SET_PROFILE_INFO,
  TWITTER_SET_STREAM_LOADING_STATUS,
  TWITTER_SET_STREAM_TWEETS,
  TWITTER_UPDATE_STREAMS,
  USER_SET_MESSAGES,
} from '../types';
import { store } from '../store';
import { v4 as uuidv4 } from 'uuid';

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
    const streamsById = store.getState().twitterReducer.streamsById;
    const updatedstreams = streams.map((stream) => {
      const s = streamsById[stream];
      return {
        id: s.id,
        type: s.type,
        search: s.search ? s.search : undefined,
      };
    });
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
        id: uuidv4(),
        type: type,
        search: search ? search : undefined,
      },
    });
    const { streams } = store.getState().twitterReducer;
    await dispatch(updateUserStreamsBackend({ streams }));
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

const removeStreamById = ({ id }) => async (dispatch) => {
  dispatch({
    type: TWITTER_REMOVE_STREAMBYID,
    payload: {
      id: id,
    },
  });
};

export const removeStream = ({ id }) => async (dispatch) => {
  try {
    const { streams } = store.getState().twitterReducer;
    const newStreams = streams.filter((s) => s !== id);
    await dispatch(updateUserStreamsBackend({ streams: newStreams }));
    await dispatch(updateStreams({ streams: newStreams }));
    await dispatch(removeStreamById({ id }));
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

export const loadTweetSearchStream = ({ id, search }) => async (dispatch) => {
  try {
    await dispatch(setStreamLoading({ id, isLoading: true }));
    const response = await axiosInstance.get(
      `/api/social/twitter/search/tweets?search=${search}`
    );
    await dispatch({
      type: TWITTER_SET_STREAM_TWEETS,
      payload: {
        id: id,
        tweets: response.data.statuses,
        metadata: response.data.search_metadata,
      },
    });
    await dispatch(setStreamLoading({ id, isLoading: false }));
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const loadMoreTweetSearchStream = ({ id, search, maxId }) => async (
  dispatch
) => {
  try {
    const response = await axiosInstance.get(
      `/api/social/twitter/search/tweets?search=${search}&maxId=${maxId}`
    );
    await dispatch({
      type: TWITTER_ADD_MORE_TWEETS,
      payload: {
        id: id,
        tweets: [...response.data.statuses],
        metadata: response.data.search_metadata,
      },
    });
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const loadHomeTimelineStream = ({ id }) => async (dispatch) => {
  try {
    await dispatch(setStreamLoading({ id, isLoading: true }));
    const response = await axiosInstance.get(
      '/api/social/twitter/statuses/home_timeline'
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

export const clearStreamsById = () => (dispatch) => {
  dispatch({
    type: TWITTER_CLEAR_STREAMSBYID,
  });
};

export const loadMoreHomeTimelineStream = ({ id, maxId }) => async (
  dispatch
) => {
  try {
    const response = await axiosInstance.get(
      `/api/social/twitter/statuses/home_timeline?maxId=${maxId}`
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
    const streamsArray = store.getState().twitterReducer.streams;
    let synced = true;
    streams.map(async (stream, idx) => {
      if (stream.id !== streamsArray[idx]) {
        synced = false;
      }
    });
    if (!synced) {
      await dispatch(updateStreams({ streams: [] }));
      await dispatch(clearStreamsById());
      streams.map((stream) => {
        return dispatch(
          addStream({
            type: stream.type,
            search: stream.search ? stream.search : undefined,
          })
        );
      });
    }
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};
