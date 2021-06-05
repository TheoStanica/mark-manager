import {
  TWITTER_RESET_TWEET_REPLIES,
  TWITTER_SET_REPLIES_LOADING_STATUS,
  TWITTER_SET_TWEET_REPLIES,
  USER_LOGOUT,
  TWITTER_SET_TWEET_LIKE_STATUS,
  TWITTER_SET_TWEET_RETWEET_STATUS,
  TWITTER_ADD_MORE_REPLIES,
} from '../types';

const initialState = {
  isLoading: false,
  replies: [],
  repliesById: {},
  metadata: {},
};

const twitterRepliesReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGOUT: {
      return {
        ...initialState,
      };
    }
    case TWITTER_RESET_TWEET_REPLIES: {
      return {
        ...initialState,
      };
    }
    case TWITTER_SET_REPLIES_LOADING_STATUS: {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    }
    case TWITTER_SET_TWEET_REPLIES:
      return {
        ...state,
        repliesById: {
          ...action.payload.replies,
        },
        replies: [...action.payload.repliesArray],
        metadata: {
          ...state.metadata,
          maxId: action.payload.maxId,
          moreReplies: action.payload.moreReplies,
        },
      };
    case TWITTER_ADD_MORE_REPLIES:
      return {
        ...state,
        repliesById: {
          ...state.repliesById,
          ...action.payload.replies,
        },
        replies: [...state.replies, ...action.payload.repliesArray],
        metadata: {
          ...state.metadata,
          maxId: action.payload.maxId,
          moreReplies: action.payload.moreReplies,
        },
      };
    case TWITTER_SET_TWEET_LIKE_STATUS: {
      return {
        ...state,
        repliesById: action.payload.isReply
          ? {
              ...state.repliesById,
              [action.payload.tweetId]: {
                ...state.repliesById[action.payload.tweetId],
                favorited: action.payload.liked,
                favorite_count: action.payload.count,
              },
            }
          : {
              ...state.repliesById,
            },
      };
    }
    case TWITTER_SET_TWEET_RETWEET_STATUS: {
      return {
        ...state,
        repliesById: action.payload.isReply
          ? {
              ...state.repliesById,
              [action.payload.tweetId]: {
                ...state.repliesById[action.payload.tweetId],
                retweeted: action.payload.retweeted,
                retweet_count: action.payload.count,
              },
            }
          : {
              ...state.repliesById,
            },
      };
    }
    default:
      return state;
  }
};

export default twitterRepliesReducer;
