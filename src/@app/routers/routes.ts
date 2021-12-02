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
import ResultExaminations from 'booking/pages/ResultExaminations';
import PostDetailPage from 'news/PostDetail';
import Evaluate from 'booking/pages/Evaluate';
import RiskPage from 'risk/QuestionTemplate';
import SecurityQuestion from 'account/security-question';
import UpdateProfile from 'account/profile/components/UpdateModal';

import notify from 'notify/index';

import ExaminationResultInfo from 'booking/pages/ExaminationResultInfo';

import Incognito from 'Incognito/index';
import VerifyAccount from '@app/components/verify-account';
import QrCode from 'account/qr-code';
import DoctorList from 'booking/pages/DoctorList';
import DoctorDetail from 'booking/pages/DoctorDetail';
import LaytestPage from 'laytest';
import UpdateLaytest from 'laytest/components/UpdateLaytest';
import CustomerService from 'home/components/CustomerService';
import UpdateAccount from 'account/account-data/components/UpdateAccount';


interface Route {
  component: React.FC;
  layout?: React.FC<{ children: ReactNode }>;
  path?: string;
  exact?: boolean;
  isPrivate?: boolean;
  isIncognito?: boolean;
}

const routes: Route[] = [
  {
    component: AuthPage,
    path: '/',
    exact: true,
  },
  {
    component: Incognito,
    path: '/incognito',
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
    component: UpdateProfile,
    path: '/profile',
    isPrivate: true,
  },
  {
    component: UpdateAccount,
    path: '/account-update',
    isPrivate: true,
  },
  {
    component: SecurityQuestion,
    layout: AppLayout,
    path: '/security-question',
    isPrivate: true,
  },
  {
    component: notify,
    layout: AppLayout,
    path: '/notify',
    isPrivate: true,
  },
  {
    component: Home,
    layout: AppLayout,
    path: '/home',
    isPrivate: true,
    isIncognito: true,
  },
  {
    component: CustomerService,
    path: '/customer-service',
    isPrivate: true,
    isIncognito: true,
  },
  {
    component: PostPage,
    layout: AppLayout,
    path: '/post',
    isPrivate: true,
    isIncognito: true,
  },
  {
    component: PostDetailPage,
    path: '/post-detail',
    isPrivate: true,
    isIncognito: true,
  },
  {
    component: Account,
    layout: AppLayout,
    path: '/account',
    isPrivate: true,
    isIncognito: false,
  },
  {
    component: RiskPage,
    layout: AppLayout,
    path: '/risk',
    isPrivate: true,
    isIncognito: true,
  },
  {
    component: HomeBooking,
    layout: AppLayout,
    path: '/shomeBooking',
    isPrivate: true,
    isIncognito: false,
  },
  {
    component: LaytestPage,
    layout: AppLayout,
    path: '/laytest',
    isPrivate: true,
    isIncognito: false,
  },
  {
    component: UpdateLaytest,
    path: '/update-laytest',
    isPrivate: true,
    isIncognito: true,
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
    // layout: AppLayout,
    path: '/apointmentInfo'
  },
  {
    component: ExaminationList,
    layout: AppLayout,
    path: '/examinationList',
    isPrivate: true,
    isIncognito: false,
  },
  {
    component: Evaluate,
    layout: AppLayout,
    path: '/evaluate'
  },
  {
    component: ResultExaminations,
    layout: AppLayout,
    isPrivate: true,
    isIncognito: false,
    path: '/resultExaminations'
  },
  {
    component: ExaminationResultInfo,
    layout: AppLayout,
    path: '/examinationResultInfo'
  },
  {
    component: DoctorList,
    layout: AppLayout,
    isPrivate: true,
    isIncognito: false,
    path: '/doctorList'
  },
  {
    component: DoctorDetail,
    layout: AppLayout,
    path: '/doctorDetail'
  },
  {
    component: VerifyAccount,
    path: '/verify-account'
  },
  {
    component: QrCode,
    path: '/qr-code'
  },
  {
    component: PageNotFound,
  },


];

export default routes;
