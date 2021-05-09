const userGateway = 'https://auth.vkhealth.vn';
const testApi = 'https://jsonplaceholder.typicode.com';

const apiLinks = {
  auth: {
    token: `${userGateway}/api/Users/Login`,
  },
  post: {
    get: `${testApi}/posts`,
    create: `${testApi}/posts`,
    update: `${testApi}/posts/`,
    delete: `${testApi}/posts/`,
  },
};

export default apiLinks;
