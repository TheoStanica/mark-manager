import {
  USER_LOGOUT,
  USER_LOGIN,
  USER_RESEND_ACTIVATION,
  USER_REGISTER,
  USER_GET_INFO,
  USER_SET_TOKENS,
  USER_UPLOAD_PHOTO,
  USER_UPDATE,
  USER_RESET_MESSAGES,
  USER_SET_MESSAGES,
} from '../types';

const initialState = {
  fullName: null,
  profilePicture: null,
  userTier: null,
  email: null,
  id: null,
  message: null,
  accessToken: null,
  refreshToken: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case USER_LOGOUT:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        fullName: action.payload.fullName,
        profilePicture: action.payload.profilePicture,
        userTier: action.payload.userTier,
        email: action.payload.email,
        id: action.payload.id,
      };
    case USER_REGISTER:
      return {
        ...state,
      };
    case USER_RESEND_ACTIVATION:
      return {
        ...state,
      };
    case USER_GET_INFO:
      return {
        ...state,
        fullName: action.payload.fullName,
        profilePicture: action.payload.profilePicture,
        userTier: action.payload.userTier,
        email: action.payload.email,
        id: action.payload.id,
      };

    case USER_SET_TOKENS: {
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    }

    case USER_UPLOAD_PHOTO: {
      return {
        ...state,
        profilePicture: action.payload.profilePicture,
      };
    }

    case USER_UPDATE: {
      return {
        ...state,
        email: action.payload.email,
        fullName: action.payload.fullName,
        profilePicture: action.payload.profilePicture,
        message: action.payload.message,
      };
    }

    case USER_SET_MESSAGES: {
      return {
        ...state,
        message: action.payload.message,
      };
    }

    case USER_RESET_MESSAGES: {
      return {
        ...state,
        message: action.payload.message,
      };
    }

    default:
      return state;
  }
};

export default userReducer;
