import axiosInstance from '../../api/buildClient';
import {
  TWITTER_RESET_PROFILE_INFO,
  TWITTER_SET_PROFILE_INFO,
  USER_SET_MESSAGES,
} from '../types';

export const getTwitterProfileInfoData = () => async (dispatch) => {
  try {
    const user = await axiosInstance.get('/api/social/twitter/user');
    if (user) {
      dispatch({
        type: TWITTER_SET_PROFILE_INFO,
        payload: {
          name: user.data.name,
          screenName: user.data.screen_name,
          profileImage: user.data.profile_image_url,
        },
      });
    }
  } catch (err) {
    // reset twitterReducer state
    // send alert message
    if (
      err.response.data.errors &&
      err.response.data.errors[0].errorType &&
      err.response.data.errors[0].errorType === 'failedConnectionError'
    ) {
      dispatch({
        type: TWITTER_RESET_PROFILE_INFO,
      });
      //temporary -- Alerts
      dispatch({
        type: USER_SET_MESSAGES,
        payload: {
          message:
            'Could not get Twitter User Data, please connect your Twitter account and try again!',
        },
      });
    }
  }
};

export const clearTwitterProfileInfoData = () => async (dispatch) => {
  dispatch({
    type: TWITTER_RESET_PROFILE_INFO,
  });
};

export const connectToTwitter = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get('/api/auth/twitter/connect');
    if (res) {
      window.location.assign(
        `https://twitter.com/oauth/authorize?oauth_token=${res.data.requestToken}`
      );
    }
  } catch (err) {
    console.log('Something didnt go right while connecting..', err);
  }
};
