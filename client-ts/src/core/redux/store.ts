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
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  createStateSyncMiddleware,
  initMessageListener,
  initStateWithPrevTab,
} from 'redux-state-sync';
import { authApi } from '../../api/auth';
import { authSlice, authReducer } from '../../features/auth/redux/slice';
import { userApi } from '../../api/user';

const reducers = {
  [authSlice.name]: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
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
      userApi.middleware
    ),
  devTools: true,
});

export type AppState = ReturnType<typeof combinedReducer>;

export const persistor = persistStore(store);
initMessageListener(store);
initStateWithPrevTab(store);
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
