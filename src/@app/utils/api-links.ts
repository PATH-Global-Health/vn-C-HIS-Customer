const authUrl = 'https://auth.vkhealth.vn';
const testApi = 'https://jsonplaceholder.typicode.com';
const userUrl = 'https://user.bakco.vn';

const apiLinks = {
  auth: {
    token: `${authUrl}/api/Users/Login`,
  },
  manageAccount: {
    create: `${authUrl}/api/Users`,
    changePassword: `${authUrl}/api/Users/ChangePassword`,
  },
  forgetPassword: {
    generateOTP: `${userUrl}/api/Users/ResetPassword/GenerateOTP`,
    confirmOTP: `${userUrl}/api/Users/ResetPassword/ConfirmOTP`,
  },
  post: {
    get: `${testApi}/posts`,
    create: `${testApi}/posts`,
    update: `${testApi}/posts/`,
    delete: `${testApi}/posts/`,
  },
};

export default apiLinks;
