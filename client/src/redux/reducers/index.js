import { combineReducers } from 'redux';
import valueReducer from './valueReducer';
import userReducer from './userReducer';
import errorsReducer from './errorsReducer';
import undoable from 'redux-undo';

export default combineReducers({
  userReducer: undoable(userReducer, { limit: 5 }),
  errorsReducer,
  valueReducer,
});
