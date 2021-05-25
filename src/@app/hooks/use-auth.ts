import { useCallback } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import moment from 'moment';
import { getUnitTypes } from '../../booking/slices/unitType';
import { getServiceForms } from '../../booking/slices/serviceForm';
import { getHospitalByServiceId } from '../../booking/slices/hospital';
import { getDateByUnitAndService } from '../../booking/slices/workingCalendar';

import {
  login as li,
  logout as lo,
  getUserInfo,
  setToken,
} from '../slices/auth';

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
    const token = unwrapResult(await dispatch(li({ username, password, remember, permissionQuery })));
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
    dispatch(getUnitTypes());
    dispatch(getServiceForms());
    dispatch(getHospitalByServiceId());
    // dispatch(getDateByUnitAndService("", ""));
    dispatch(getUserInfo(`Profiles?userId=` + `cd176cb7-21bf-43e0-e592-08d88a021d74`));
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
    logout,
  };
};

export default useAuth;
