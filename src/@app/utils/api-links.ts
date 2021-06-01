const testApi = 'https://jsonplaceholder.typicode.com';
const userUrl = 'https://user.bakco.vn';

const apiLinks = {
  auth: {
    token: `${userUrl}/api/Users/Login`,
  },
  manageAccount: {
    create: `${userUrl}/api/Users`,
    changePassword: `${userUrl}/api/Users/ChangePassword`,
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
