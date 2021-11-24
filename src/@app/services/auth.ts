import axios from 'axios';
import { httpClient, apiLinks } from '@app/utils';

import { Token } from '@app/models/token';
import { AccountInfo } from '@app/models/accountInfo';
import { Permission } from '@app/models/permission';
//import { UserInfo } from '@app/models/user-info';

const login = async (username: string, password: string, remember: boolean, permissionQuery: {}): Promise<Token> => {
  const response = await axios({
    method: 'POST',
    url: apiLinks.auth.token,
    data: {
      username,
      password,
      permissionQuery,
    },
  });
  return response.data as Token;
};

const loginWithFacebook = async ({
  accessToken = '',
}: {
  accessToken?: string;
}): Promise<Token> => {
  const response = await httpClient.post({
    url: apiLinks.auth.loginWithFacebook,
    params: {
      accessToken
    }
  });
  return response.data as Token;
};
const loginWithGoogle = async ({
  idToken = '',
}: {
  idToken?: string;
}): Promise<Token> => {
  const response = await httpClient.post({
    url: apiLinks.auth.loginWithGoogle,
    params: {
      idToken
    }
  });
  return response.data as Token;
};
const loginWithIncognito = async (): Promise<Token> => {
  const response = await axios({
    method: 'POST',
    url: apiLinks.auth.loginWithIncognito,
  });
  return response.data as Token;
};
const getPermission = async (token: string): Promise<Permission[]> => {
  const headerToken = token ? { Authorization: `bearer ${token}` } : null;
  const response = await axios({
    url: apiLinks.auth.getPermission,
    headers: { ...headerToken },
  });

  return response.data as Permission[];
}
const createAccount = async ({
  userName,
  password,
  phoneNumber,
  fullName,
  // email,
}: {
  userName: string;
  password: string;
  phoneNumber: string;
  // email: string;
  fullName: string;
}): Promise<void> => {
  const response = await axios({
    method: 'POST',
    url: apiLinks.manageAccount.create,
    data: {
      userName,
      password,
      phoneNumber,
      fullName,
      // email,
    },
  });
  return response.data;
};
const updatePhoneNumber = async ({
  fullName,
  phoneNumber,
}: {
  fullName: string,
  phoneNumber: string,
}
): Promise<void> => {
  await httpClient.put({
    url: apiLinks.manageAccount.updatePhoneNumber,
    data: {
      fullName,
      phoneNumber
    }
  })
}
const sendPhoneOTP = async (phoneNumber?: string): Promise<any> => {
  const response = await httpClient.post({
    url: apiLinks.manageAccount.generateOTP,
    params: {
      phoneNumber,
    }
  });
  return response;
};
const verifyPhoneOTP = async ({
  phoneNumber,
  otp,
}: {
  phoneNumber?: string,
  otp?: string,
}): Promise<void> => {
  await httpClient.post({
    url: apiLinks.manageAccount.confirmOTP,
    data: {
      phoneNumber,
      otp
    },
  });
};
const sendMailOTP = async (email?: string): Promise<any> => {
  const response = await httpClient.post({
    url: apiLinks.auth.confirmEmail,
    params: {
      email
    }
  });
  return response;
};
const verifyEmailOTP = async ({
  email,
  otp,
}: {
  email?: string,
  otp?: string,
}): Promise<void> => {
  await httpClient.post({
    url: apiLinks.auth.verifyEmailOTp,
    data: {
      email,
      otp
    },
  });
};
const changePassword = async ({
  oldPassword,
  newPassword
}: {
  oldPassword: string;
  newPassword: string;
}): Promise<void> => {
  await httpClient.put({
    url: apiLinks.manageAccount.changePassword,
    data: {
      oldPassword,
      newPassword
    },
  });
};

const generateOTP = async ({
  phoneNumber,
  email,
  question,
}: {
  phoneNumber?: string;
  email?: string,
  question?: {
    id: string,
    answer: string,
  }
}): Promise<void> => {
  await httpClient.post({
    url: apiLinks.forgetPassword.generateOTP,
    data: {
      phoneNumber,
      email,
      question
    },
  });
};
const confirmOTP = async ({
  email,
  phoneNumber,
  otp
}: {
  email?: string;
  phoneNumber?: string;
  otp: string;
}): Promise<Token> => {
  const response = await httpClient.post({
    url: apiLinks.forgetPassword.confirmOTP,
    data: {
      email,
      phoneNumber,
      otp,
    },
  });
  return response.data as Token;
};
const resetPassword = async ({
  newPassword,
}: {
  newPassword: string;
}): Promise<void> => {
  await httpClient.post({
    url: apiLinks.manageAccount.resetPassword,
    data: {
      newPassword
    },
  });
};
const getUserInfo = async (): Promise<AccountInfo> => {
  const response = await httpClient.get({
    url: apiLinks.auth.userInfo,
  });
  return response.data as AccountInfo;
};

const authService = {
  login,
  loginWithFacebook,
  loginWithGoogle,
  getUserInfo,
  getPermission,
  loginWithIncognito,
  createAccount,
  updatePhoneNumber,
  sendPhoneOTP,
  verifyPhoneOTP,
  sendMailOTP,
  verifyEmailOTP,
  changePassword,
  generateOTP,
  confirmOTP,
  resetPassword,
};

export default authService;
