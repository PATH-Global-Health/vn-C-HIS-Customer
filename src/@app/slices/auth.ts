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
import { AccountInfo } from '@app/models/accountInfo';

interface State {
  token: Token | null;
  tokenExpiredTime: Date | null;
  loginLoading: boolean;
  loginError: string | null;
  userInfo: AccountInfo | null;
  getUserInfoLoading: boolean;
  permissionList: Permission[];
  forgotPasswordData: {
    inputData?: string,
    method?: string,
    accessToken?: string
  }
  tokenForgotPassword: string | null;
}

const initialState: State = {
  token: null,
  tokenExpiredTime: null,
  loginLoading: false,
  loginError: null,
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
  forgotPasswordData: {
    inputData: undefined,
    method: undefined,
    accessToken: undefined,
  },
  tokenForgotPassword: null,
};

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async () => {
    const result = await authService.getUserInfo();
    return result;
  },
);
const login = createAsyncThunk(
  'auth/login',
  async (arg: { username: string; password: string; remember: boolean; permissionQuery: {} }) => {
    try {
      const { username, password, permissionQuery, remember } = arg;
      const result = await authService.login(username, password, remember, permissionQuery);
      return result;
    } catch (error: any) {
      throw new Error(error.response.data);
    }
  },
);
const loginWithFacebook = createAsyncThunk(
  'auth/loginWithFacebook',
  async (arg: { accessToken: string }) => {
    const { accessToken } = arg;
    const result = await authService.loginWithFacebook({ accessToken });
    return result;
  },
);

const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (arg: { idToken: string }) => {
    const { idToken } = arg;
    const result = await authService.loginWithGoogle({ idToken });
    return result;
  },
);

const loginWithIncognito = createAsyncThunk(
  'auth/loginWithIncognito',
  async () => {
    const result = await authService.loginWithIncognito();
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

const setDataForgotPasswordCR: CR<{
  inputData?: string,
  method?: string,
  accessToken?: string,
}> = (state, action) => ({
  ...state,
  forgotPasswordData: action.payload,
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
    setDataForgotPassword: setDataForgotPasswordCR,
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
    builder.addCase(login.rejected, (state, action) => ({
      ...state,
      loginError: action?.error?.message ?? null,
      loginLoading: false,
    }));

    //login with facebook
    builder.addCase(loginWithFacebook.pending, (state) => ({
      ...state,
      loginLoading: true,
    }));
    builder.addCase(loginWithFacebook.fulfilled, (state, { payload }) => {
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
    builder.addCase(loginWithFacebook.rejected, (state) => ({
      ...state,
      loginLoading: false,
    }));

    //login with google
    builder.addCase(loginWithGoogle.pending, (state) => ({
      ...state,
      loginLoading: true,
    }));
    builder.addCase(loginWithGoogle.fulfilled, (state, { payload }) => {
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
    builder.addCase(loginWithGoogle.rejected, (state) => ({
      ...state,
      loginLoading: false,
    }));

    //login with incognito
    builder.addCase(loginWithIncognito.pending, (state) => ({
      ...state,
      loginLoading: true,
    }));
    builder.addCase(loginWithIncognito.fulfilled, (state, { payload }) => {
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
    builder.addCase(loginWithIncognito.rejected, (state, action) => ({
      ...state,
      loginError: action?.error?.message ?? null,
      loginLoading: false,
    }));

    // get user info
    builder.addCase(getUserInfo.pending, (state) => ({
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
    }));
  },
});

export { login, loginWithFacebook, loginWithGoogle, loginWithIncognito, getUserInfo };
export const {
  logout,
  setToken,
  setDataForgotPassword,
  setTokenForgotPassword,
} = slice.actions;

export default slice.reducer;
