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
const createAccount = async ({
  userName,
  password,
  phoneNumber,
  fullName,
  email,
}: {
  userName: string;
  password: string;
  phoneNumber: string;
  email: string;
  fullName: string;
}): Promise<void> => {
  await httpClient.post({
    url: apiLinks.manageAccount.create,
    data: {
      userName,
      password,
      phoneNumber,
      fullName,
      email,
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
  otp
}: {
  email?: string;
  otp: string;
}): Promise<Token> => {
  const response = await httpClient.post({
    url: apiLinks.forgetPassword.confirmOTP,
    data: {
      email,
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
  sendMailOTP,
  verifyEmailOTP,
  changePassword,
  generateOTP,
  confirmOTP,
  resetPassword,
};

export default authService;
