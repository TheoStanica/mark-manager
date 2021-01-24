import {
  USER_LOGOUT,
  USER_LOGIN,
  USER_RESEND_ACTIVATION,
  USER_REGISTER,
  USER_GET_INFO,
  USER_SET_TOKENS,
} from '../types';

const initialState = {
  fullName: '',
  profilePicture: '',
  userTier: '',
  email: '',
  id: '',
  accessToken: null,
  refreshToken: null,
  errors: null,
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
        fullName: action.payload.fullName,
        profilePicture: action.payload.profilePicture,
        userTier: action.payload.userTier,
        email: action.payload.email,
        id: action.payload.id,
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
    default:
      return state;
  }
};

export default userReducer;
