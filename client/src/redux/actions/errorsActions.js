import { RESET_ERRORS, SET_ERRORS } from '../types';

export const resetErrors = () => async (dispatch) => {
  dispatch({
    type: RESET_ERRORS,
  });
};

export const setErrors = (errors) => async (dispatch) => {
  console.log(errors);
  dispatch({
    type: SET_ERRORS,
    payload: errors,
  });
};
