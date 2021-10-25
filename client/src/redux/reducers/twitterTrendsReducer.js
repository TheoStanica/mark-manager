import {
  TWITTER_SET_TRENDS,
  TWITTER_SET_TRENDS_LOADING_STATUS,
} from '../types';

const initialState = {
  trends: [],
  isLoading: false,
};

const twitterTrendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TWITTER_SET_TRENDS_LOADING_STATUS:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    case TWITTER_SET_TRENDS:
      return {
        ...state,
        trends: action.payload.trends,
      };
    default:
      return state;
  }
};

export default twitterTrendsReducer;
