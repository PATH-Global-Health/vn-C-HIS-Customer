const userGateway = 'http://202.78.227.202:31753/api';
const testApi = 'https://jsonplaceholder.typicode.com';

const apiLinks = {
  auth: {
    token: `${userGateway}/Users/Login`,
  },
  post: {
    get: `${testApi}/posts`,
    create: `${testApi}/posts`,
    update: `${testApi}/posts/`,
    delete: `${testApi}/posts/`,
  },
};

export default apiLinks;
