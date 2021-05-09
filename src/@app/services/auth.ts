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
/* const getUserInfo = async (): Promise<UserInfo> => {
  const response = await httpClient.get({
    url: apiLinks.auth.userInfo,
  });
  return response.data as UserInfo;
}; */

const authService = {
  login,
  createAccount
};

export default authService;
