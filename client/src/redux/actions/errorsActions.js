import { RESET_ERRORS } from '../types';

export const resetErrors = () => async (dispatch) => {
  dispatch({
    type: RESET_ERRORS,
  });
};
