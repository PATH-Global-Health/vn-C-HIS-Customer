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
} from '../slices/auth';

import useSelector from './use-selector';
import useDispatch from './use-dispatch';

import { Token } from '../models/token';
import { TOKEN, EXPIRED_TIME, ACCESS_PERMISSION } from '../utils/constants';
import { useHistory } from 'react-router';
import { Permission } from '@app/models/permission';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

type UseAuth = {
  isAuthenticated: () => Promise<boolean>;
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

const getStorage = async (key: string): Promise<string> =>{
  // (localStorage.getItem(key) || sessionStorage.getItem(key)) ?? 'null';
  const result = await SecureStoragePlugin.get({ key: key });
  return result.value;
}

const useAuth = (): UseAuth => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isAuthenticated = useCallback(async(): Promise<boolean> => {
    console.log(getStorage(TOKEN));
    const token = JSON.parse(await getStorage(TOKEN)) as Token;

    const tokenExpiredTime: Date = new Date(await getStorage(EXPIRED_TIME));
    if (token && tokenExpiredTime > new Date()) {
      dispatch<any>(getPermission(token.access_token))
        .then((response: any) => {
          const { payload: permissionList } = response;
          const authorized = permissionList?.find((p: any) => p?.code && p.code === ACCESS_PERMISSION);
          if (!authorized) {
            SecureStoragePlugin.remove(({key: TOKEN}));
            SecureStoragePlugin.remove(({key: EXPIRED_TIME}));
            dispatch(lo());
            history.replace('/login');
          }
        });

      dispatch(setToken({ token, tokenExpiredTime }));
      dispatch(getPermission(token.access_token));
      return true;
    }
    SecureStoragePlugin.remove(({key: TOKEN}));
    SecureStoragePlugin.remove(({key: EXPIRED_TIME}));
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
    const permissionList = await unwrapResult(await dispatch<any>(getPermission(token.access_token))) as Permission[];
    const authorized = permissionList.find((p) => p?.code && p.code === ACCESS_PERMISSION);
    if (authorized) {
        SecureStoragePlugin.set({ key: TOKEN, value: JSON.stringify(token)});
        SecureStoragePlugin.set({ key: EXPIRED_TIME, value: moment()
          .add(token.expires_in * 1000, 'seconds')
          .toString()})
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
    SecureStoragePlugin.set({ key: TOKEN, value: JSON.stringify(token)});
        SecureStoragePlugin.set({ key: EXPIRED_TIME, value: moment()
          .add(token.expires_in * 1000, 'seconds')
          .toString()});
  };

  // login with google
  const loginWithGoogle = async (
    idToken: string,
  ): Promise<void> => {
    const token = unwrapResult(await dispatch(lig({ idToken })));
    SecureStoragePlugin.set({ key: TOKEN, value: JSON.stringify(token)});
        SecureStoragePlugin.set({ key: EXPIRED_TIME, value: moment()
          .add(token.expires_in * 1000, 'seconds')
          .toString()});
  };

  //login with incognito
  const loginWithIncognito = async (
  ): Promise<void> => {
    const token = unwrapResult(await dispatch(lia()));
    SecureStoragePlugin.set({ key: TOKEN, value: JSON.stringify(token)});
        SecureStoragePlugin.set({ key: EXPIRED_TIME, value: moment()
          .add(token.expires_in * 1000, 'seconds')
          .toString()});
  };

  const logout = useCallback((): void => {
    SecureStoragePlugin.remove(({key: TOKEN}));
    SecureStoragePlugin.remove(({key: EXPIRED_TIME}));
    dispatch(lo());
  }, [dispatch]);

  return {
    isAuthenticated,
    login,
    loginWithFacebook,
    loginWithGoogle,
    loginWithIncognito,
    logout,
  };
};

export default useAuth;
