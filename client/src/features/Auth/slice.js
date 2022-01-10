import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../api/auth/api';

const initialState = {
  accessToken: null,
  refreshToken: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    clear() {
      return initialState;
    },
    update: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
      }
    );
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, () => {
      return initialState;
    });
  },
});

export const authReducer = authSlice.reducer;
