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
import PostDetail from 'news/PostDetail';
import HomeBooking from 'booking/pages/HomeBooking';
import TestingAppointment from 'booking/pages/TestingAppointment';
import MakingApointment from 'booking/pages/MakingApointment';
import ApointmentDate from 'booking/pages/ApointmentDate';
import ChoosingHospital from 'booking/pages/ChoosingHospital';
import { HospitalDetail } from 'booking/components';
import ChoosingTime from 'booking/pages/ChoosingTime';
import ConfirmProfile from 'booking/pages/ConfirmProfile';
import ApointmentInfo from 'booking/pages/ApointmentInfo';

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
    component: PostDetail,
    path: '/post-detail',
    isPrivate: true,
  },
  {
    component: Account,
    layout: AppLayout,
    path: '/account',
    isPrivate: true,
  },
  {
    component: HomeBooking,
    path: '/homeBooking',
  },
  {
    component: TestingAppointment,
    path: '/testingAppointment',
  },
  {
    component: MakingApointment,
    path: '/makingApointment',
  },

  {
    component: ApointmentDate,
    path: '/apointmentDate'
  },
  {
    component: ChoosingHospital,
    path: '/choosingHospital'
  },
  {
    component: HospitalDetail,
    path: '/hospitalDetail'
  },
  {
    component: ChoosingTime,
    path: '/choosingTime'
  },
  {
    component: ConfirmProfile,
    path: '/confirmProfile'
  },
  {
    component: ApointmentInfo,
    path: '/apointmentInfo'
  },
  {
    component: PageNotFound,
  },

];

export default routes;
