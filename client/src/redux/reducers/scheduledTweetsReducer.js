import {
  TWITTER_ADD_SCHEDULED_TWEETS,
  TWITTER_CLEAR_SCHEDULED_TWEETS,
  TWITTER_SET_SCHEDULED_TWEETS_LOADING,
} from '../types';

const initialState = {
  scheduledTweets: [],
  scheduledTweetsById: {},
  cursors: {},
  isLoading: null,
};

const scheduledTweetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TWITTER_ADD_SCHEDULED_TWEETS: {
      return {
        ...state,
        scheduledTweets: [
          ...state.scheduledTweets,
          ...action.payload.scheduledTweets,
        ],
        scheduledTweetsById: {
          ...state.scheduledTweetsById,
          ...action.payload.scheduledTweetsById,
        },
        cursors: {
          ...state.cursors,
          [action.payload.twitterUserId]: action.payload.nextCursor,
        },
      };
    }
    case TWITTER_SET_SCHEDULED_TWEETS_LOADING: {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    }
    case TWITTER_CLEAR_SCHEDULED_TWEETS: {
      return initialState;
    }
    default:
      return state;
  }
};

export default scheduledTweetsReducer;
