import { combineReducers } from 'redux';
import valueReducer from './valueReducer';
import userReducer from './userReducer';
import errorsReducer from './errorsReducer';

export default combineReducers({ userReducer, errorsReducer, valueReducer });
