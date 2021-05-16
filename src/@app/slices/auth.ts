import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  CaseReducer,
} from '@reduxjs/toolkit';

import authService from '@app/services/auth';

import { Token } from '@app/models/token';
import { UserInfo } from '@app/models/user-info';
import { Permission } from '@app/models/permission';
import { Method } from 'ionicons/dist/types/stencil-public-runtime';

interface State {
  token: Token | null;
  tokenExpiredTime: Date | null;
  loginLoading: boolean;
  userInfo: UserInfo | null;
  getUserInfoLoading: boolean;
  permissionList: Permission[];
  methodForgotPassword: string | null;
  tokenForgotPassword: string | null;
}

const initialState: State = {
  token: null,
  tokenExpiredTime: null,
  loginLoading: false,
  userInfo: null,
  getUserInfoLoading: false,
  permissionList: [
    // { code: 'ADMIN' },
    { code: 'CSYT_CATALOG' },
    { code: 'CSYT_WORKING_SCHEDULE' },
    { code: 'CSYT_EXAMINATION' },
    // { code: 'CSYT_VACCINATION' },
    // { code: 'CSYT_TELEMEDICINE' },
  ],
  methodForgotPassword: null,
  tokenForgotPassword: null,
};

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const login = createAsyncThunk(
  'auth/login',
  async (arg: { username: string; password: string; remember: boolean; permissionQuery: {} }) => {
    const { username, password, permissionQuery, remember } = arg;
    const result = await authService.login(username, password, remember, permissionQuery);
    return result;
  },
);

const setTokenCR: CR<{
  token: Token;
  tokenExpiredTime: Date;
}> = (state, action) => ({
  ...state,
  token: action.payload.token,
  tokenExpiredTime: action.payload.tokenExpiredTime,
});

/* const getUserInfo = createAsyncThunk('auth/getUserInfo', async () => {
  const result = await authService.getUserInfo();
  window.document.title = result.name || result.username;
  return result;
}); */

const logoutCR: CR<void> = () => ({
  ...initialState,
});

const setMethodForgotPasswordCR: CR<string | null> = (state, action) => ({
  ...state,
  methodForgotPassword: action.payload,
});

const setTokenForgotPasswordCR: CR<string | null> = (state, action) => ({
  ...state,
  tokenForgotPassword: action.payload,
})

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: setTokenCR,
    logout: logoutCR,
    setMethodForgotPassword: setMethodForgotPasswordCR,
    setTokenForgotPassword: setTokenForgotPasswordCR,
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(login.pending, (state) => ({
      ...state,
      loginLoading: true,
    }));
    builder.addCase(login.fulfilled, (state, { payload }) => {
      const { username } = payload;
      return {
        ...state,
        loginLoading: false,
        token: payload,
        tokenExpiredTime: new Date(
          new Date().getTime() + payload.expires_in * 1000,
        ),
        permissionList:
          username === '1'
            ? [{ code: 'ADMIN' }, { code: 'CSYT_CATALOG' }]
            : initialState.permissionList,
      };
    });
    builder.addCase(login.rejected, (state) => ({
      ...state,
      loginLoading: false,
    }));

    // get user info
    /*   builder.addCase(getUserInfo.pending, (state) => ({
        ...state,
        getUserInfoLoading: true,
      }));
      builder.addCase(getUserInfo.fulfilled, (state, { payload }) => ({
        ...state,
        userInfo: payload,
        getUserInfoLoading: false,
      }));
      builder.addCase(getUserInfo.rejected, (state) => ({
        ...state,
        getUserInfoLoading: false,
      })); */
  },
});

export { login };
export const {
  logout,
  setToken,
  setMethodForgotPassword,
  setTokenForgotPassword,
} = slice.actions;

export default slice.reducer;
