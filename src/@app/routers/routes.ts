import { ReactNode } from 'react';

import HomePage from '@app/pages/HomePage';
import PageNotFound from '@app/pages/PageNotFound';
import AppLayout from '@app/components/app-layout';
import PostPage from 'post';
import RegisterPage from '@app/pages/RegisterPage';
import LoginPage from '@app/pages/LoginPage';
import Home from 'pages';
import ChangePasswordPage from '@app/pages/ChangePasswordPage';

interface Route {
  component: React.FC;
  layout?: React.FC<{ children: ReactNode }>;
  path?: string;
  exact?: boolean;
  isPrivate?: boolean;
}

const routes: Route[] = [
  {
    component: HomePage,
    layout: AppLayout,
    path: '/',
    exact: true,
  },
  {
    component: PageNotFound,
  },
  {
    component: LoginPage,
    path: '/login',
  },
  {
    component: RegisterPage,
    path: '/register',
  },
  {
    component: ChangePasswordPage,
    path: '/change-password',
    exact: true,
  },
  {
    component: PostPage,
    layout: AppLayout,
    path: '/post',
  },

  {
    component: Home,
    layout: AppLayout,
    path: '/home',
  },

];

export default routes;
