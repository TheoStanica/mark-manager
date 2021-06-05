import {
  TWITTER_ADD_STREAM,
  TWITTER_ADD_MORE_TWEETS,
  TWITTER_SET_STREAM_LOADING_STATUS,
  TWITTER_SET_STREAM_TWEETS,
  TWITTER_UPDATE_STREAMS,
  USER_LOGOUT,
  TWITTER_CLEAR_ALL_STREAMS,
  TWITTER_ADD_MULTIPLE_STREAMS,
  TWITTER_REMOVE_STREAM,
  TWITTER_ADD_MULTIPLE_ACCOUNTS,
  TWITTER_CLEAR_ALL_ACCOUNTS,
  TWITTER_SET_ACCOUNT_DATA,
  TWITTER_FILTER_ACCOUNTS,
  TWITTER_SET_TWEET_LIKE_STATUS,
  TWITTER_SET_TWEET_RETWEET_STATUS,
} from '../types';

const initialState = {
  twitterAccounts: [],
  twitterAccountsById: {},
  twitterFilteredAccounts: [],
  streams: [],
  streamsById: {},
  tweetsById: {},
};

const twitterReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case TWITTER_ADD_MULTIPLE_STREAMS:
      return {
        ...state,
        streams: [...state.streams, ...action.payload.streams],
        streamsById: {
          ...state.streamsById,
          ...action.payload.streamsById,
        },
      };
    case TWITTER_REMOVE_STREAM:
      return {
        ...state,
        streams: state.streams.filter((stream) => stream !== action.payload.id),
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
        tweetsById: {},
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
        tweetsById: action.payload.filteredTweetsById
          ? {
              ...action.payload.filteredTweetsById,
              ...action.payload.newTweetsById,
            }
          : {
              ...state.tweetsById,
              ...action.payload.newTweetsById,
            },
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
              action.payload.tweetsIds
            ),
            metadata: action.payload.metadata,
          },
        },
        tweetsById: {
          ...state.tweetsById,
          ...action.payload.tweets,
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
    case TWITTER_SET_TWEET_LIKE_STATUS: {
      let updatedTweetsById = {};
      if (action.payload.isRetweet) {
        updatedTweetsById = {
          ...state.tweetsById,
          [action.payload.tweetId]: {
            ...state.tweetsById[action.payload.tweetId],
            retweeted_status: {
              ...state.tweetsById[action.payload.tweetId].retweeted_status,
              favorited: action.payload.liked,
              favorite_count: action.payload.count,
            },
          },
        };
      } else if (!action.payload.isReply) {
        updatedTweetsById = {
          ...state.tweetsById,
          [action.payload.tweetId]: {
            ...state.tweetsById[action.payload.tweetId],
            favorited: action.payload.liked,
            favorite_count: action.payload.count,
          },
        };
      } else {
        updatedTweetsById = {
          ...state.tweetsById,
        };
      }
      return {
        ...state,
        tweetsById: updatedTweetsById,
      };
    }
    case TWITTER_SET_TWEET_RETWEET_STATUS: {
      let updatedTweetsById = {};
      if (action.payload.isRetweet) {
        updatedTweetsById = {
          ...state.tweetsById,
          [action.payload.tweetId]: {
            ...state.tweetsById[action.payload.tweetId],
            retweeted_status: {
              ...state.tweetsById[action.payload.tweetId].retweeted_status,
              retweeted: action.payload.retweeted,
              retweet_count: action.payload.count,
            },
          },
        };
      } else if (!action.payload.isReply) {
        updatedTweetsById = {
          ...state.tweetsById,
          [action.payload.tweetId]: {
            ...state.tweetsById[action.payload.tweetId],
            retweeted: action.payload.retweeted,
            retweet_count: action.payload.count,
          },
        };
      } else {
        updatedTweetsById = {
          ...state.tweetsById,
        };
      }
      return {
        ...state,
        tweetsById: updatedTweetsById,
      };
    }
    case TWITTER_ADD_MULTIPLE_ACCOUNTS:
      return {
        ...state,
        twitterAccounts: [...state.twitterAccounts, ...action.payload.accounts],
        twitterAccountsById: {
          ...state.twitterAccountsById,
          ...action.payload.accountsById,
        },
      };
    case TWITTER_CLEAR_ALL_ACCOUNTS:
      return {
        ...state,
        twitterAccounts: [],
        twitterAccountsById: {},
      };
    case TWITTER_SET_ACCOUNT_DATA:
      return {
        ...state,
        twitterAccountsById: {
          ...state.twitterAccountsById,
          [action.payload.id]: {
            ...state.twitterAccountsById[action.payload.id],
            name: action.payload.name,
            screenName: action.payload.screenName,
            profileImage: action.payload.profileImage,
            isConnected: true,
          },
        },
      };
    case TWITTER_FILTER_ACCOUNTS:
      return {
        ...state,
        twitterFilteredAccounts: action.payload.accounts,
      };
    default:
      return state;
  }
};

export default twitterReducer;
