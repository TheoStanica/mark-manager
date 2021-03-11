import {
  RESET_ERRORS,
  SET_ERRORS,
  USER_GET_INFO,
  USER_LOGIN,
  USER_LOGOUT,
  USER_RESEND_ACTIVATION,
  USER_RESET_MESSAGES,
  USER_SET_MESSAGES,
  USER_SET_TOKENS,
  USER_UPDATE,
  USER_UPLOAD_PHOTO,
} from '../types';
import axiosInstance from '../../api/buildClient';

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
        errors: err.response.data.errors,
      },
    });
  }
};

export const registerUser = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_ERRORS,
    });
    await axiosInstance.post('/api/auth/signup', {
      email,
      password,
    });
    dispatch({
      type: USER_SET_MESSAGES,
      payload: {
        message:
          'Account created! Please check your email for an activation email!',
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

export const updateUser = ({ email, fullName, imgData }) => async (
  dispatch
) => {
  try {
    let dataToSend;
    if (imgData) {
      const res = await axiosInstance.post('/api/user/uploadimage', imgData);
      dataToSend = {
        email,
        fullName,
        profilePicture: res.data.imageUrl,
      };
    } else {
      dataToSend = {
        email,
        fullName,
      };
    }
    const response = await axiosInstance.put(
      '/api/user/currentuser',
      dataToSend
    );
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
    if (err.response && err.response.data && err.response.data.errors) {
      dispatch({
        type: SET_ERRORS,
        payload: {
          errors: err.response.data.errors,
        },
      });
    } else {
      dispatch({
        type: SET_ERRORS,
        payload: {
          errors: [{ message: 'Something went wrong. Please try again later' }],
        },
      });
    }
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

export const setUserMessages = ({ message }) => async (dispatch) => {
  dispatch({
    type: USER_SET_MESSAGES,
    payload: {
      message,
    },
  });
};

export const requestPasswordReset = ({ email }) => async (dispatch) => {
  try {
    await axiosInstance.post('/api/auth/resetpassword', {
      email: email,
    });
    dispatch({
      type: USER_SET_MESSAGES,
      payload: {
        message: 'Please check your email to reset your password',
      },
    });
  } catch (err) {
    if (err.response.data) {
      dispatch({
        type: SET_ERRORS,
        payload: {
          errors: err.response.data.errors,
        },
      });
    }
  }
};

export const userResetPassword = ({ token, password }) => async (dispatch) => {
  try {
    await axiosInstance.post(`/api/auth/resetpassword/${token}`, {
      password: password,
    });
    dispatch({
      type: USER_SET_MESSAGES,
      payload: {
        message: 'Account Updated! You can now log in!',
      },
    });
  } catch (err) {
    if (err.response.data) {
      dispatch({
        type: SET_ERRORS,
        payload: {
          errors: err.response.data.errors,
        },
      });
    }
  }
};

export const activateAccount = ({ id }) => async (dispatch) => {
  try {
    await axiosInstance.get(`/api/auth/activation/${id}`);
    return true;
  } catch (err) {
    return false;
  }
};
