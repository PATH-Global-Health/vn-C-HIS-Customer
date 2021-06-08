import { ReactNode } from 'react';

import HomePage from '@app/pages/HomePage';
import PageNotFound from '@app/pages/PageNotFound';
import AppLayout from '@app/components/app-layout';
import PostPage from 'post';
import RegisterPage from '@app/pages/RegisterPage';
import LoginPage from '@app/pages/LoginPage';
import HomeBooking from '../../booking/pages/HomeBooking';
import TestingApointment from '../../booking/pages/TestingApointment';
import MakingApointment from '../../booking/pages/MakingApointment';
import ApointmentDate from '../../booking/pages/ApointmentDate';
import ChoosingHospital from '../../booking/pages/ChoosingHospital';
import HospitalDetail from 'booking/components/HospitalDetail';
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
    component: PostPage,
    layout: AppLayout,
    path: '/post',
  },

  {
    component: HomeBooking,
    path: '/homeBooking',
  },
  {
    component: TestingApointment,
    // layout: AppLayout,
    path: '/testingApointment',
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
  }

];

export default routes;
