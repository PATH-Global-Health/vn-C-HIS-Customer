import { httpClient, apiLinks } from '@app/utils';

import { Token } from '@app/models/token';
//import { UserInfo } from '@app/models/user-info';

const login = async (username: string, password: string, remember: boolean, permissionQuery: {}): Promise<Token> => {
  const response = await httpClient.post({
    url: apiLinks.auth.token,
    // data: `grant_type=password&username=${username}&password=${password}`,
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
  accessToken = '',
}: {
  accessToken?: string;
}): Promise<Token> => {
  const response = await httpClient.post({
    url: apiLinks.auth.loginWithGoogle,
    params: {
      accessToken
    }
  });
  return response.data as Token;
};
const createAccount = async ({
  userName,
  password,
  email,
  phoneNumber,
  fullName
}: {
  userName: string;
  password: string;
  email: string;
  phoneNumber: string;
  fullName: string;
}): Promise<void> => {
  await httpClient.post({
    url: apiLinks.manageAccount.create,
    data: {
      userName,
      password,
      email,
      phoneNumber,
      fullName
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
  username,
  phoneNumber,
  email,
  question,
}: {
  username: string;
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
      username,
      phoneNumber,
      email,
      question
    },
  });
};
const confirmOTP = async ({
  username,
  otp
}: {
  username?: string;
  otp: string;
}): Promise<Token> => {
  const response = await httpClient.post({
    url: apiLinks.forgetPassword.confirmOTP,
    data: {
      username,
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
/* const getUserInfo = async (): Promise<UserInfo> => {
  const response = await httpClient.get({
    url: apiLinks.auth.userInfo,
  });
  return response.data as UserInfo;
}; */

const authService = {
  login,
  loginWithFacebook,
  loginWithGoogle,
  createAccount,
  changePassword,
  generateOTP,
  confirmOTP,
  resetPassword,
};

export default authService;
