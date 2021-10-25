import { combineReducers } from 'redux';
import userReducer from './userReducer';
import errorsReducer from './errorsReducer';
import undoable from 'redux-undo';
import twitterReducer from './twitterReducer';
import { withReduxStateSync } from 'redux-state-sync';
import twitterRepliesReducer from './twitterRepliesReducer';
import twitterTrendsReducer from './twitterTrendsReducer';

export default withReduxStateSync(
  combineReducers({
    userReducer: undoable(userReducer, { limit: 5 }),
    errorsReducer,
    twitterReducer,
    twitterRepliesReducer,
    twitterTrendsReducer,
  })
);
