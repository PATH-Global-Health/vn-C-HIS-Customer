const authUrl = 'https://auth.vkhealth.vn';
const testApi = 'https://jsonplaceholder.typicode.com';

const apiLinks = {
  auth: {
    token: `${authUrl}/api/Users/Login`,
  },
  manageAccount: {
    create: `${authUrl}/api/Users`,
    changePassword: `${authUrl}/api/Users/ChangePassword`,
  },
  post: {
    get: `${testApi}/posts`,
    create: `${testApi}/posts`,
    update: `${testApi}/posts/`,
    delete: `${testApi}/posts/`,
  },
};

export default apiLinks;
