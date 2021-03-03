import {
  TWITTER_RESET_PROFILE_INFO,
  TWITTER_SET_HOME_TIMELINE_TWEETS,
  TWITTER_SET_PROFILE_INFO,
} from '../types';

const initialState = {
  name: '',
  screenName: '',
  profileImage: '',
  isConnected: false,
  home_timeline_tweets: [],
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
        home_timeline_tweets: [],
      };
    case TWITTER_SET_HOME_TIMELINE_TWEETS:
      return {
        ...state,
        home_timeline_tweets: action.payload.tweets,
      };
    default:
      return state;
  }
};

export default twitterReducer;
