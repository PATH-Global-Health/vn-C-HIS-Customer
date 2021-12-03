const userUrl = 'https://api.chis.vn/v1/auth';
const smapi = 'https://api.chis.vn/v1/schedule';
const cmsApi = 'https://api.chis.vn/v1/mini-cms';
const apiBookingService = 'https://api.chis.vn/v1/booking';

const apiLinks = {
  auth: {
    token: `${userUrl}/Users/Login`,
    loginWithFacebook: `${userUrl}/Users/LoginWithFacebook`,
    loginWithGoogle: `${userUrl}/Users/LoginWithGoogle`,
    loginWithIncognito: `${userUrl}/Users/AnonymousLogin`,
    userInfo: `${userUrl}/Users/GetUserInfo`,
    getPermission: `${userUrl}/Users/Permissions/Ui`,
    confirmEmail: `${userUrl}/Users/SendOTPVerification`,
    verifyEmailOTp: `${userUrl}/Users/VerifyEmailOTP`,
  },
  manageAccount: {
    create: `${userUrl}/Users`,
    updateAccount: `${userUrl}/Users`,
    updatePhoneNumber: `${userUrl}/Users`,
    sendUpdateOtp: `${userUrl}/Users/SendUpdateUserOTP`,
    generateOTP: `${userUrl}/Users/SendOTPVerification`,
    confirmOTP: `${userUrl}/Users/VerifyOTPOfPhoneNumber`,
    changePassword: `${userUrl}/Users/ChangePassword`,
    resetPassword: `${userUrl}/Users/ResetPassword`,
  },
  forgetPassword: {
    generateOTP: `${userUrl}/Users/ResetPassword/GenerateOTP`,
    confirmOTP: `${userUrl}/Users/ResetPassword/ConfirmOTP`,
  },
  securitySetting: {
    getQuestions: `${userUrl}/Users/SecurityQuestion`,
    getDetails: (id: string): string =>
      `${userUrl}/Users/SecurityQuestion/${id}`,
    update: `${userUrl}/Users/ChangeSecurityQuestionAnswer`,
    confirmSecurity: `${userUrl}/Users/ResetPassword/ConfirmSecurityQuestion`,
  },
  post: {
    get: `${cmsApi}/Post`,
    getDetails: (id: string): string =>
      `${cmsApi}/Part/${id}`,
  },
  tag: {
    get: `${cmsApi}/Tag`,
  },
  questionTemplate: {
    get: `${cmsApi}/QuestionTemplate/Filter`,
    getDetails: (id: string): string => `${cmsApi}/QuestionTemplate/${id}`
  },
  surveySession: {
    getDetails: ({
      userId = undefined,
      templateId = undefined,
    }: {
      userId?: string;
      templateId?: string;
    }) => `${cmsApi}/SurveySession/UserChecked/${userId}/${templateId}`,
    post: `${cmsApi}/SurveySession`,
  },
  profile: {
    get: `${smapi}/Profiles`,
    update: `${smapi}/Profiles`,
  },
  laytest: {
    get: `${apiBookingService}/TestingHistory/LayTest`,
    update: `${apiBookingService}/TestingHistory/LayTest`,
  },
  manageSchedule: {
    unitTypes: {
      get: `${smapi}/api/UnitTypes`,
    },
    serviceForms: {
      get: `${smapi}/api/ServiceForms`,
    },
    hospital: {
      get: `${smapi}/api/Hospitals`,
      getHospitalImage: `${smapi}/api/Hospitals/Logo/`
    },
    workingCalendar: {
      getDaysByUnitAndService: `${smapi}/api/WorkingCalendars/GetDaysByUnitAndService`,
      getInterval: `${smapi}/api/WorkingCalendars/GetIntervals`,
      getIntervalsWithDayId: `${smapi}/api/WorkingCalendars/GetIntervalsWithDayId`,
    },
    days: {
      get: `${smapi}/api/Days/WorkingDate`,
      getDateByServiceId: `${smapi}/api/Days/Available/`,
    },
    profile: {
      get: `${smapi}/Profiles`
    },
    doctor: {
      getAllDoctor: `${smapi}/api/Doctors/GetAllDoctor`
    }
  },
  bookingService: {
    postExaminations: `${apiBookingService}/api/Examinations`,
    resultForm: `${apiBookingService}/api/Examinations/ResultForm`
  },
};

export default apiLinks;
