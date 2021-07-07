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
import HomeBooking from 'booking/pages/HomeBooking';
import TestingAppointment from 'booking/pages/TestingAppointment';
import ApointmentDate from 'booking/pages/ApointmentDate';
import ChoosingHospital from 'booking/pages/ChoosingHospital';
import { HospitalDetail } from 'booking/components';
import ChoosingTime from 'booking/pages/ChoosingTime';
import ConfirmProfile from 'booking/pages/ConfirmProfile';
import ApointmentInfo from 'booking/pages/ApointmentInfo';
import ExaminationList from 'booking/pages/ExaminationList';
import PostDetailPage from 'news/PostDetail';
import BookingTest from 'home/test';
import Evaluate from 'booking/pages/Evaluate';

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
    component: BookingTest,
    layout: AppLayout,
    path: '/risk',
    isPrivate: true,
  },
  {
    component: PostPage,
    layout: AppLayout,
    path: '/post',
    isPrivate: true,
  },
  {
    component: PostDetailPage,
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
    layout: AppLayout,
    path: '/homeBooking',
    isPrivate: true,
  },
  {
    component: TestingAppointment,
    layout: AppLayout,
    path: '/testingAppointment',
  },

  {
    component: ApointmentDate,
    layout: AppLayout,
    path: '/apointmentDate'
  },
  {
    component: ChoosingHospital,
    layout: AppLayout,
    path: '/choosingHospital'
  },
  {
    component: HospitalDetail,
    layout: AppLayout,
    path: '/hospitalDetail'
  },
  {
    component: ChoosingTime,
    layout: AppLayout,
    path: '/choosingTime'
  },
  {
    component: ConfirmProfile,
    layout: AppLayout,
    path: '/confirmProfile'
  },
  {
    component: ApointmentInfo,
    layout: AppLayout,
    path: '/apointmentInfo'
  },
  {
    component: ExaminationList,
    layout: AppLayout,
    path: '/examinationList'
  },
  {
    component: Evaluate,
    layout: AppLayout,
    path: '/evaluate'
  },
  {
    component: PageNotFound,
  },

];

export default routes;
