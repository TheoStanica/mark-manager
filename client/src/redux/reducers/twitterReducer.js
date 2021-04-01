import {
  TWITTER_ADD_STREAM,
  TWITTER_ADD_MORE_TWEETS,
  TWITTER_RESET_PROFILE_INFO,
  TWITTER_SET_PROFILE_INFO,
  TWITTER_SET_STREAM_LOADING_STATUS,
  TWITTER_SET_STREAM_TWEETS,
  TWITTER_UPDATE_STREAMS,
  USER_LOGOUT,
  TWITTER_CLEAR_ALL_STREAMS,
  TWITTER_ADD_MULTIPLE_STREAMS,
  TWITTER_REMOVE_STREAM,
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
        ...initialState,
      };
    case USER_LOGOUT: {
      return {
        ...initialState,
      };
    }
    case TWITTER_ADD_STREAM:
      return {
        ...state,
        streams: [...state.streams, action.payload.id],
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
    case TWITTER_CLEAR_ALL_STREAMS:
      return {
        ...state,
        streams: [],
        streamsById: {},
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
            metadata: action.payload.metadata,
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
    case TWITTER_CLEAR_STREAMSBYID: {
      return {
        ...state,
        streamsById: {},
      };
    }
    case TWITTER_ADD_MORE_TWEETS: {
      return {
        ...state,
        streamsById: {
          ...state.streamsById,
          [action.payload.id]: {
            ...state.streamsById[action.payload.id],
            tweets: state.streamsById[action.payload.id].tweets.concat(
              action.payload.tweets
            ),
            metadata: action.payload.metadata,
          },
        },
      };
    }
    default:
      return state;
  }
};

export default twitterReducer;
