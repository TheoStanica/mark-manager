import {
  TWITTER_ADD_STREAM,
  TWITTER_REMOVE_STREAMBYID,
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
  streamsById: {},
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
        streamsById: {},
      };
    case USER_LOGOUT: {
      return {
        ...state,
        name: '',
        screenName: '',
        profileImage: '',
        isConnected: false,
        streams: [],
        streamsById: {},
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
        streamsById: {
          ...state.streamsById,
          [action.payload.id]: action.payload,
        },
      };
    case TWITTER_REMOVE_STREAMBYID:
      return {
        ...state,
        streamsById: {
          ...state.streamsById,
          [action.payload.id]: undefined,
        },
      };
    case TWITTER_UPDATE_STREAMS:
      return {
        ...state,
        streams: action.payload.streams,
      };
    case TWITTER_SET_STREAM_TWEETS: {
      return {
        ...state,
        streamsById: {
          ...state.streamsById,
          [action.payload.id]: {
            ...state.streamsById[action.payload.id],
            tweets: action.payload.tweets,
          },
        },
      };
    }
    case TWITTER_SET_STREAM_LOADING_STATUS: {
      return {
        ...state,
        streamsById: {
          ...state.streamsById,
          [action.payload.id]: {
            ...state.streamsById[action.payload.id],
            isLoading: action.payload.isLoading,
          },
        },
      };
    }
    default:
      return state;
  }
};

export default twitterReducer;
