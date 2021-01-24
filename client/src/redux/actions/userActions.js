import {
  SET_ERRORS,
  USER_GET_INFO,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  USER_RESEND_ACTIVATION,
  USER_SET_TOKENS,
} from '../types';
import axiosInstance from '../../api/buildClient';
import { store } from '../store';

export const loginUser = ({ email, password }) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/api/auth/signin', {
      email,
      password,
    });
    if (response) {
      dispatch({
        type: USER_LOGIN,
        payload: {
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: {
        errors: err.response,
      },
    });
  }
};

export const registerUser = ({ email, password }) => async (dispatch) => {
  try {
    await axiosInstance.post('/api/auth/signup', {
      email,
      password,
    });
    dispatch({
      type: USER_REGISTER,
    });
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: {
        errors: err.response,
      },
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  dispatch({
    type: USER_LOGOUT,
    payload: {
      accessToken: null,
      refreshToken: null,
      fullName: null,
      profilePicture: null,
      userTier: null,
      email: null,
      id: null,
    },
  });
};

export const resendActivationEmail = (userId) => async (dispatch) => {
  try {
    await axiosInstance.post('/api/auth/activation/resend', {
      userId: userId,
    });
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: {
        errors: err.response,
      },
    });
  }

  dispatch({
    type: USER_RESEND_ACTIVATION,
  });
};

export const getUserInfo = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/api/user/currentuser', {
      headers: {
        Authorization: `Bearer ${store.getState().userReducer.accessToken}`,
      },
    });
    if (response) {
      dispatch({
        type: USER_GET_INFO,
        payload: {
          fullName: response.data.user.fullName,
          profilePicture: response.data.user.profilePicture,
          userTier: response.data.user.userTier,
          email: response.data.user.email,
          id: response.data.user.id,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: {
        errors: err.response,
      },
    });
  }
};

export const setUserTokens = ({ accessToken, refreshToken }) => async (
  dispatch
) => {
  dispatch({
    type: USER_SET_TOKENS,
    payload: {
      accessToken,
      refreshToken,
    },
  });
};
