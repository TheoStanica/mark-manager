import {
  SET_ERRORS,
  USER_GET_INFO,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  USER_RESEND_ACTIVATION,
  USER_RESET_MESSAGES,
  USER_SET_MESSAGES,
  USER_SET_TOKENS,
  USER_UPDATE,
  USER_UPLOAD_PHOTO,
} from '../types';
import axiosInstance from '../../api/buildClient';

export const loginUser = ({ email, password, history }) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/api/auth/signin', {
      email,
      password,
    });
    if (response) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      dispatch({
        type: USER_LOGIN,
        payload: {},
      });
      history.push('/dashboard');
    }
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: {
        errors: err.response.data.errors,
      },
    });
    return null;
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
        errors: err.response.data.errors,
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
        errors: err.response.data.errors,
      },
    });
  }

  dispatch({
    type: USER_RESEND_ACTIVATION,
  });
};

export const getUserInfo = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/api/user/currentuser');
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
        errors: err.response.data.errors,
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

export const uploadPhoto = (data) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/api/user/uploadimage', data);
    dispatch({
      type: USER_UPLOAD_PHOTO,
      payload: {
        profilePicture: response.data.imageUrl,
      },
    });
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: {
        errors: err.response.data.errors,
      },
    });
  }
};

export const updateUser = ({ email, fullName, profilePicture }) => async (
  dispatch
) => {
  try {
    const data = {
      email,
      fullName,
      profilePicture,
    };
    const response = await axiosInstance.put('/api/user/currentuser', data);
    if (response) {
      dispatch({
        type: USER_UPDATE,
        payload: {
          email: response.data.updatedUser.email,
          fullName: response.data.updatedUser.fullName,
          profilePicture: response.data.updatedUser.profilePicture,
          message: 'Account updated!',
        },
      });
    }
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: {
        errors: err.response.data.errors,
      },
    });
  }
};

export const resetUserMessages = () => async (dispatch) => {
  dispatch({
    type: USER_RESET_MESSAGES,
    payload: {
      message: null,
    },
  });
};

export const changePassword = ({ currentPassword, newPassword }) => async (
  dispatch
) => {
  try {
    const response = await axiosInstance.put(
      'https://mark.dev/api/auth/changepassword',
      {
        currentPassword,
        newPassword,
      }
    );
    if (response)
      dispatch({
        type: USER_SET_MESSAGES,
        payload: {
          message: 'Account updated!',
        },
      });
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: {
        errors: err.response.data.errors,
      },
    });
  }
};
