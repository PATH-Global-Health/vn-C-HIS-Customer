const userUrl = 'https://user-management.bakco.vn';

// const smapi = 'https://schedule-management.bakco.vn';
const smapi = 'http://202.78.227.174:30111';

const cmsApi = 'https://mini-cms.bakco.vn';
const apiBookingService = 'https://booking-management.bakco.vn';

const apiLinks = {
  auth: {
    token: `${userUrl}/api/Users/Login`,
    loginWithFacebook: `${userUrl}/api/Users/LoginWithFacebook`,
    loginWithGoogle: `${userUrl}/api/Users/LoginWithGoogle`,
    loginWithIncognito: `${userUrl}/api/Users/AnonymousLogin`,
    userInfo: `${userUrl}/api/Users/GetUserInfo`,
    getPermission: `${userUrl}/api/Users/Permissions/Ui`,
    confirmEmail: `${userUrl}/api/Users/SendOTPVerification`,
    verifyEmailOTp: `${userUrl}/api/Users/VerifyEmailOTP`,
  },
  manageAccount: {
    create: `${userUrl}/api/Users`,
    updateAccount: `${userUrl}/api/Users`,
    updatePhoneNumber: `${userUrl}/api/Users`,
    sendUpdateOtp: `${userUrl}/api/Users/SendUpdateUserOTP`,
    generateOTP: `${userUrl}/api/Users/SendOTPVerification`,
    confirmOTP: `${userUrl}/api/Users/VerifyOTPOfPhoneNumber`,
    changePassword: `${userUrl}/api/Users/ChangePassword`,
    resetPassword: `${userUrl}/api/Users/ResetPassword`,
  },
  forgetPassword: {
    generateOTP: `${userUrl}/api/Users/ResetPassword/GenerateOTP`,
    confirmOTP: `${userUrl}/api/Users/ResetPassword/ConfirmOTP`,
  },
  securitySetting: {
    getQuestions: `${userUrl}/api/SecurityQuestion`,
    getDetails: (id: string): string =>
      `${userUrl}/api/SecurityQuestion/${id}`,
    update: `${userUrl}/api/Users/ChangeSecurityQuestionAnswer`,
    confirmSecurity: `${userUrl}/api/Users/ResetPassword/ConfirmSecurityQuestion`,
  },
  post: {
    get: `${cmsApi}/api/Post`,
    getDetails: (id: string): string =>
      `${cmsApi}/api/Part/${id}`,
  },
  tag: {
    get: `${cmsApi}/api/Tag`,
  },
  questionTemplate: {
    get: `${cmsApi}/api/QuestionTemplate/Filter`,
    getDetails: (id: string): string => `${cmsApi}/api/QuestionTemplate/${id}`
  },
  surveySession: {
    getDetails: ({
      userId = undefined,
      templateId = undefined,
    }: {
      userId?: string;
      templateId?: string;
    }) => `${cmsApi}/api/SurveySession/UserChecked/${userId}/${templateId}`,
    post: `${cmsApi}/api/SurveySession`,
  },
  profile: {
    get: `${smapi}/api/Profiles`,
    update: `${smapi}/api/Profiles`,
  },
  laytest: {
    get: `${apiBookingService}/api/TestingHistory/LayTest`,
    update: `${apiBookingService}/api/TestingHistory/LayTest`,
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
      get: `${smapi}/api/Profiles`
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