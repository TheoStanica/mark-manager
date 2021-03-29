import {
  TWITTER_ADD_STREAM,
  TWITTER_ADD_MORE_TWEETS,
  TWITTER_RESET_PROFILE_INFO,
  TWITTER_SET_HOME_TIMELINE_TWEETS,
  TWITTER_SET_PROFILE_INFO,
  TWITTER_SET_STREAM_LOADING_STATUS,
  TWITTER_SET_STREAM_TWEETS,
  TWITTER_UPDATE_STREAMS,
  USER_LOGOUT,
} from '../types';

const initialState = {
  name: '',
  screenName: '',
  profileImage: '',
  isConnected: false,
  streams: [],
};

const twitterReducer = (state = initialState, action) => {
  switch (action.type) {
    case TWITTER_SET_PROFILE_INFO:
      return {
        ...state,
        name: action.payload.name,
        screenName: action.payload.screenName,
        profileImage: action.payload.profileImage,
        isConnected: true,
      };
    case TWITTER_RESET_PROFILE_INFO:
      return {
        ...state,
        name: '',
        screenName: '',
        profileImage: '',
        isConnected: false,
        streams: [],
      };
    case USER_LOGOUT: {
      return {
        ...state,
        name: '',
        screenName: '',
        profileImage: '',
        isConnected: false,
        streams: [],
      };
    }
    case TWITTER_SET_HOME_TIMELINE_TWEETS:
      return {
        ...state,
        home_timeline_tweets: action.payload.tweets,
      };
    case TWITTER_ADD_STREAM:
      return {
        ...state,
        streams: [...state.streams, action.payload],
      };
    case TWITTER_UPDATE_STREAMS:
      return {
        ...state,
        streams: action.payload.streams,
      };
    case TWITTER_SET_STREAM_TWEETS: {
      const streamIdx = state.streams.findIndex(
        (stream) => stream.id === action.payload.id
      );
      const streams = [...state.streams];
      streams[streamIdx] = {
        ...streams[streamIdx],
        tweets: action.payload.tweets,
        metadata: action.payload.metadata,
      };
      return {
        ...state,
        streams,
      };
    }
    case TWITTER_SET_STREAM_LOADING_STATUS: {
      const streamIdx = state.streams.findIndex(
        (stream) => stream.id === action.payload.id
      );
      const streams = [...state.streams];
      streams[streamIdx] = {
        ...streams[streamIdx],
        isLoading: action.payload.isLoading,
      };
      return {
        ...state,
        streams,
      };
    }
    case TWITTER_ADD_MORE_TWEETS: {
      const streamIdx = state.streams.findIndex(
        (stream) => stream.id === action.payload.id
      );
      const streams = [...state.streams];
      streams[streamIdx] = {
        ...streams[streamIdx],
        tweets: streams[streamIdx].tweets.concat(action.payload.tweets),
        metadata: action.payload.metadata,
      };
      return {
        ...state,
        streams,
      };
    }
    default:
      return state;
  }
};

export default twitterReducer;
