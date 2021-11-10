import {
  TWITTER_ADD_SCHEDULED_TWEETS,
  TWITTER_CLEAR_SCHEDULED_TWEETS,
  TWITTER_REMOVE_SCHEDULED_TWEET,
  TWITTER_SET_SCHEDULED_TWEETS_LOADING,
  TWITTER_UPDATE_SCHEDULED_TWEET,
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
    case TWITTER_UPDATE_SCHEDULED_TWEET: {
      const updatedScheduledTweets = {
        ...state.scheduledTweetsById,
        [action.payload.scheduledTweetId]: {
          ...state.scheduledTweetsById[action.payload.scheduledTweetId],
          twitterUserId: action.payload.twitterUserId,
          scheduled_at: action.payload.scheduleAt,
          text: action.payload.text,
        },
      };
      return {
        ...state,
        scheduledTweetsById: updatedScheduledTweets,
      };
    }
    case TWITTER_REMOVE_SCHEDULED_TWEET: {
      return {
        ...state,
        scheduledTweets: state.scheduledTweets.filter(
          (tweet) => tweet !== action.payload.scheduledTweetId
        ),
        scheduledTweetsById: {
          ...state.scheduledTweetsById,
          [action.payload.scheduledTweetId]: undefined,
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
