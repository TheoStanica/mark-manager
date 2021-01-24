import { RESET_ERRORS, SET_ERRORS } from '../types';

const initialState = {
  errors: null,
};

const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload.errors,
      };
    case RESET_ERRORS:
      return {
        ...state,
        errors: null,
      };
    default:
      return state;
  }
};

export default errorsReducer;
