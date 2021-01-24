import { UPDATE_VALUE } from '../types';

export const increaseValue = (currentValue) => async (dispatch) => {
  let newValue = currentValue + 1;

  dispatch({
    type: UPDATE_VALUE,
    payload: {
      value: newValue,
    },
  });
};

export const decreaseValue = (currentValue) => async (dispatch) => {
  let newValue = currentValue - 1;

  dispatch({
    type: UPDATE_VALUE,
    payload: {
      value: newValue,
    },
  });
};
