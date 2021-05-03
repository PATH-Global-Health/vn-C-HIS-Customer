import { ReactNode } from 'react';

import HomePage from '@app/pages/HomePage';
import PageNotFound from '@app/pages/PageNotFound';
import AppLayout from '@app/components/app-layout';
import PostPage from 'post';

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
    component: PageNotFound,
  },
];

export default routes;
