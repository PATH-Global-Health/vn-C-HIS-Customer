import { useCallback } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import moment from 'moment';

import {
  login as li,
  logout as lo,
  loginWithFacebook as lif,
  loginWithGoogle as lig,
  loginWithIncognito as lia,
  setToken,
  getPermission,
} from '@app/slices/auth';
import store from '@app/store';

import useSelector from './use-selector';
import useDispatch from './use-dispatch';

import { Token } from '../models/token';
import { TOKEN, EXPIRED_TIME, ACCESS_PERMISSION } from '../utils/constants';
import { useHistory } from 'react-router';
import { Permission } from '@app/models/permission';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

type UseAuth = {
  isAuthenticated: () => Promise<boolean>;
  isRegistered: () => boolean;
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
  loginWithIncognito: () => Promise<void>;

  logout: () => void;
};

const useAuth = (): UseAuth => {
  const dispatch = useDispatch();
  const history = useHistory();

  const getStorage = async (key: string): Promise<string> => {
    try {
      const result = await SecureStoragePlugin.get({ key: key });
      return result.value;
    } catch (err: any) {
      return '';
    }
  }

  const isAuthenticated = useCallback(async (): Promise<boolean> => {
    const stringToken = await getStorage(TOKEN);
    const stringExpired = await getStorage(EXPIRED_TIME);
    if (stringToken && stringExpired) {
      const token = JSON.parse(stringToken) as Token;
      const expired = new Date(stringExpired);

      if (expired > new Date()) {
        if (token && token.access_token) {
          dispatch<any>(getPermission(token.access_token))
            .then((response: any) => {
              const { payload: permissionList } = response;
              const authorized = permissionList?.find((p: any) => p?.code && p.code === ACCESS_PERMISSION);
              if (!authorized) {
                SecureStoragePlugin.remove(({ key: TOKEN }));
                SecureStoragePlugin.remove(({ key: EXPIRED_TIME }));
                dispatch(lo());
                history.replace('/login');
              }
            });

          dispatch(setToken({ token, tokenExpiredTime: expired }));
          dispatch(getPermission(token.access_token));
          return true;
        }
      }
    }

    SecureStoragePlugin.remove(({ key: TOKEN }));
    SecureStoragePlugin.remove(({ key: EXPIRED_TIME }));
    dispatch(lo());
    return false;
  }, [dispatch]);

  const isRegistered = useCallback((): boolean => {
    const token = store.getState().auth.token;
    if (token && token?.username && token.username.length !== 36) {
      return true;
    }
    return false;
  }, [dispatch]);

  const login = async (
    username: string,
    password: string,
    remember: boolean,
    permissionQuery: {},
  ): Promise<void> => {
    const token = await unwrapResult(await dispatch(li({ username, password, remember, permissionQuery })));
    const permissionList = await unwrapResult(await dispatch<any>(getPermission(token.access_token))) as Permission[];
    const authorized = permissionList.find((p) => p?.code && p.code === ACCESS_PERMISSION);
    if (authorized) {
      await SecureStoragePlugin.set({ key: TOKEN, value: JSON.stringify(token) });
      await SecureStoragePlugin.set({
        key: EXPIRED_TIME, value: moment()
          .add(token.expires_in * 1000, 'seconds')
          .toString()
      })
    } else {
      throw new Error('Tài khoản không có quyền truy cập');
    }
    /*  dispatch(getUserInfo()); */
  };

  // login with facebook
  const loginWithFacebook = async (
    accessToken: string,
  ): Promise<void> => {
    const token = unwrapResult(await dispatch(lif({ accessToken })));
    SecureStoragePlugin.set({ key: TOKEN, value: JSON.stringify(token) });
    SecureStoragePlugin.set({
      key: EXPIRED_TIME, value: moment()
        .add(token.expires_in * 1000, 'seconds')
        .toString()
    });
  };

  // login with google
  const loginWithGoogle = async (
    idToken: string,
  ): Promise<void> => {
    const token = unwrapResult(await dispatch(lig({ idToken })));
    SecureStoragePlugin.set({ key: TOKEN, value: JSON.stringify(token) });
    SecureStoragePlugin.set({
      key: EXPIRED_TIME, value: moment()
        .add(token.expires_in * 1000, 'seconds')
        .toString()
    });
  };

  //login with incognito
  const loginWithIncognito = async (): Promise<void> => {
    const token = unwrapResult(await dispatch(lia()));
    SecureStoragePlugin.set({ key: TOKEN, value: JSON.stringify(token) });
    SecureStoragePlugin.set({
      key: EXPIRED_TIME, value: moment()
        .add(token.expires_in * 1000, 'seconds')
        .toString()
    });
  };

  const logout = useCallback((): void => {
    SecureStoragePlugin.remove(({ key: TOKEN }));
    SecureStoragePlugin.remove(({ key: EXPIRED_TIME }));
    dispatch(lo());
  }, [dispatch]);

  return {
    isAuthenticated,
    isRegistered,
    login,
    loginWithFacebook,
    loginWithGoogle,
    loginWithIncognito,
    logout,
  };
};

export default useAuth;
