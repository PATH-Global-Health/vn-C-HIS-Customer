import { ReactNode } from 'react';

import AuthPage from '@app/pages/AuthPage';
import PageNotFound from '@app/pages/PageNotFound';
import AppLayout from '@app/components/app-layout';
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
    component: PageNotFound,
  },
];

export default routes;
