import { TWITTER_RESET_PROFILE_INFO, TWITTER_SET_PROFILE_INFO } from '../types';

const initialState = {
  name: '',
  screenName: '',
  profileImage: '',
  isConnected: false,
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
      };
    default:
      return state;
  }
};

export default twitterReducer;
