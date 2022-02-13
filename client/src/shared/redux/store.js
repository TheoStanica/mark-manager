import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { authApi } from '../../api/auth/api';
import { authReducer, authSlice } from '../../features/Auth/slice';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import { useDispatch, useSelector } from 'react-redux';
import { userApi } from '../../api/user/api';
import {
  createStateSyncMiddleware,
  initMessageListener,
  initStateWithPrevTab,
} from 'redux-state-sync';
import { twitterApi } from '../../api/twitter/api';

const reducers = {
  [authSlice.name]: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [twitterApi.reducerPath]: twitterApi.reducer,
};

const combinedReducer = combineReducers(reducers);

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['authSlice'],
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      createStateSyncMiddleware({ blacklist: ['persist/PERSIST'] }),
      authApi.middleware,
      userApi.middleware,
      twitterApi.middleware
    ),
  devTools: false,
});

export const persistor = persistStore(store);
initMessageListener(persistor);
initStateWithPrevTab(persistor);
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
