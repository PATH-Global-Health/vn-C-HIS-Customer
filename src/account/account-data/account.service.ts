import { httpClient, apiLinks } from '@app/utils';

const sendUpdateOTP = async ({
  email = '',
  phoneNumber = '',
}: {
  email?: string,
  phoneNumber?: string,
}): Promise<void> => {
  const data = email ? { email } : phoneNumber ? { phoneNumber } : {};
  await httpClient.post({
    url: apiLinks.manageAccount.sendUpdateOtp,
    data,
  });
};
const updateAccount = async ({
  fullName = '',
  phoneNumber = '',
  email = '',
  otp = ''
}: {
  fullName?: string,
  phoneNumber?: string,
  email?: string,
  otp?: string
}): Promise<void> => {
  const data = fullName ? { fullName, otp } : phoneNumber ? { phoneNumber, otp } : email ? { email, otp } : {};
  await httpClient.put({
    url: apiLinks.manageAccount.updateAccount,
    data,
  });
};
const accountService = {
  sendUpdateOTP,
  updateAccount
};

export default accountService;
