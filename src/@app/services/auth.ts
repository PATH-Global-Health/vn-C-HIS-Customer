import { httpClient, apiLinks } from '@app/utils';

import { Token } from '@app/models/token';
import { UserInfo } from '@app/models/user-info';

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
  var result = await httpClient.post({
    url: apiLinks.manageAccount.create,
    data: {
      userName,
      password,
      email,
      phoneNumber,
      fullName
    },
  });
  console.log(result.data)
};

const getUserInfo = async (): Promise<UserInfo> => {
  const response = await httpClient.get({
    url: apiLinks.manageSchedule.profile.get,
  });
  return response.data as UserInfo;
};

const testApi = async () => {
  try {
    const result = await httpClient.get({
      url: apiLinks.post.getBooking
    });
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
}

const authService = {
  testApi,
  login,
  createAccount,
  getUserInfo,
};

export default authService;
