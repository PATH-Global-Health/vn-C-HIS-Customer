import { useCallback } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import moment from 'moment';

import {
  login as li,
  logout as lo,
  loginWithFacebook as lif,
  loginWithGoogle as lig,
  setToken,
} from '../slices/auth';

import useSelector from './use-selector';
import useDispatch from './use-dispatch';

import { Token } from '../models/token';
import { TOKEN, EXPIRED_TIME } from '../utils/constants';

type UseAuth = {
  isAuthenticated: () => boolean;
  login: (
    username: string,
    password: string,
    remember: boolean,
    permissionQuery: {},
  ) => Promise<void>;
  loginWithFacebook: (
    accessToken: string,
  ) => Promise<void>;
  loginWithGoogle: (
    idToken: string,
  ) => Promise<void>;

  logout: () => void;
};

const getStorage = (key: string): string =>
  (localStorage.getItem(key) || sessionStorage.getItem(key)) ?? 'null';

const useAuth = (): UseAuth => {
  const dispatch = useDispatch();

  const isAuthenticated = useCallback((): boolean => {
    const token = JSON.parse(getStorage(TOKEN)) as Token;
    const tokenExpiredTime: Date = new Date(getStorage(EXPIRED_TIME));
    if (token && tokenExpiredTime > new Date()) {
      dispatch(setToken({ token, tokenExpiredTime }));
      return true;
    }

    localStorage.removeItem(TOKEN);
    localStorage.removeItem(EXPIRED_TIME);
    sessionStorage.removeItem(TOKEN);
    sessionStorage.removeItem(EXPIRED_TIME);
    dispatch(lo());
    return false;
  }, [dispatch]);

  const login = async (
    username: string,
    password: string,
    remember: boolean,
    permissionQuery: {},
  ): Promise<void> => {
    const token = await unwrapResult(await dispatch(li({ username, password, remember, permissionQuery })));
    if (remember) {
      localStorage.setItem(TOKEN, JSON.stringify(token));
      localStorage.setItem(
        EXPIRED_TIME,
        moment()
          .add(token.expires_in * 1000, 'seconds')
          .toString(),
      );
    } else {
      sessionStorage.setItem(TOKEN, JSON.stringify(token));
      sessionStorage.setItem(
        EXPIRED_TIME,
        moment()
          .add(token.expires_in * 1000, 'seconds')
          .toString(),
      );
    }
    /*  dispatch(getUserInfo()); */
  };
  // login with facebook
  const loginWithFacebook = async (
    accessToken: string,
  ): Promise<void> => {
    const token = unwrapResult(await dispatch(lif({ accessToken })));
    localStorage.setItem(TOKEN, JSON.stringify(token));
    localStorage.setItem(
      EXPIRED_TIME,
      moment()
        .add(token.expires_in * 1000, 'seconds')
        .toString(),
    );
  };

  // login with google
  const loginWithGoogle = async (
    idToken: string,
  ): Promise<void> => {
    const token = unwrapResult(await dispatch(lig({ idToken })));
    localStorage.setItem(TOKEN, JSON.stringify(token));
    localStorage.setItem(
      EXPIRED_TIME,
      moment()
        .add(token.expires_in * 1000, 'seconds')
        .toString(),
    );
  };

  const logout = useCallback((): void => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(EXPIRED_TIME);
    sessionStorage.removeItem(TOKEN);
    sessionStorage.removeItem(EXPIRED_TIME);
    dispatch(lo());
  }, [dispatch]);

  return {
    isAuthenticated,
    login,
    loginWithFacebook,
    loginWithGoogle,
    logout,
  };
};

export default useAuth;
