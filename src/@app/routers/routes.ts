import { ReactNode } from 'react';

import HomePage from '@app/pages/HomePage';
import PageNotFound from '@app/pages/PageNotFound';
import AppLayout from '@app/components/app-layout';
import PostPage from 'post';
import RegisterPage from '@app/pages/RegisterPage';
import LoginPage from '@app/pages/LoginPage';

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
    component: HomePage,
    layout: AppLayout,
    path: '/home',
  },
  {
    component: PostPage,
    layout: AppLayout,
    path: '/post',
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
    component: PageNotFound,
  },
];

export default routes;
