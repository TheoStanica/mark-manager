import { UPDATE_VALUE } from '../types';

const initialState = {
  value: 0,
};

const valueReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VALUE:
      return {
        ...state,
        secondValue: 3,
        value: action.payload.value,
      };
    default:
      return state;
  }
};

// module.exports = valueReducer;
export default valueReducer;
