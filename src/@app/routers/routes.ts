import { ReactNode } from 'react';

import AuthPage from '@app/pages/AuthPage';
import PageNotFound from '@app/pages/PageNotFound';
import AppLayout from '@app/components/app-layout';
import RegisterPage from '@app/pages/RegisterPage';
import LoginPage from '@app/pages/LoginPage';
import ChangePasswordPage from '@app/pages/ChangePasswordPage';
import ForgetPassword from '@app/pages/ForgetPasswordPage';
import Account from 'account';
import Home from 'home';
import PostPage from 'news/post';

interface Route {
  component: React.FC;
  layout?: React.FC<{ children: ReactNode }>;
  path?: string;
  exact?: boolean;
  isPrivate?: boolean;
}

const routes: Route[] = [
  {
    component: AuthPage,
    path: '/',
    exact: true,
  },
  {
    component: AuthPage,
    path: '/auth',
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
    component: ForgetPassword,
    path: '/forget-password',
  },
  {
    component: ChangePasswordPage,
    path: '/change-password',
    isPrivate: true,
  },
  {
    component: Home,
    layout: AppLayout,
    path: '/home',
    isPrivate: true,
  },
  {
    component: PostPage,
    layout: AppLayout,
    path: '/post',
    isPrivate: true,
  },
  {
    component: Account,
    layout: AppLayout,
    path: '/account',
    isPrivate: true,
  },
  {
    component: PageNotFound,
  },
];

export default routes;
