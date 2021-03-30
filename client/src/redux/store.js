import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  createStateSyncMiddleware,
  initMessageListener,
  initStateWithPrevTab,
} from 'redux-state-sync';

const config = {
  blacklist: ['persist/PERSIST'],
};

const middleware = [thunk, createStateSyncMiddleware(config)];

const persistConfig = {
  key: 'root',
  blacklist: ['twitterReducer', 'errorsReducer'],
  storage,
};

const pReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(
  pReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
let persistor = persistStore(store);
initMessageListener(persistor);
initStateWithPrevTab(persistor);

export { store, persistor };
