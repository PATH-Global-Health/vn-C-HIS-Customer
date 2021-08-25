const testApi = 'https://jsonplaceholder.typicode.com';
const userUrl = 'http://202.78.227.174:14765';
const smapi = 'http://202.78.227.174:30111';
// http://202.78.227.174:30111/
const cmsApi = 'http://202.78.227.174:44322';

// const smapi = ' https://localhost:44353';
// https://localhost:44353
const apiBookingService = 'http://202.78.227.174:14789';
// const apiBookingService = 'https://localhost:44308';
// https://localhost:44308/

const apiLinks = {
  auth: {
    token: `${userUrl}/api/Users/Login`,
    loginWithFacebook: `${userUrl}/api/Users/LoginWithFacebook`,
    loginWithGoogle: `${userUrl}/api/Users/LoginWithGoogle`,
    userInfo: `${userUrl}/api/Users/GetUserInfo`,
    confirmEmail: `${userUrl}/api/Users/SendOTPVerification`,
    verifyEmailOTp: `${userUrl}/api/Users/VerifyEmailOTP`,
  },
  manageAccount: {
    create: `${userUrl}/api/Users`,
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
    create: `${testApi}/api/Post`,
    update: `${testApi}/Post/`,
    delete: `${testApi}/Post/`,
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
  manageSchedule: {
    unitTypes: {
      get: `${smapi}/api/UnitTypes`,
    },
    serviceForms: {
      get: `${smapi}/api/ServiceForms`,
    },
    hospital: {
      get: `${smapi}/api/Hospitals`,
    },
    workingCalendar: {
      getDaysByUnitAndService: `${smapi}/api/WorkingCalendars/GetDaysByUnitAndService`,
      getInterval: `${smapi}/api/WorkingCalendars/GetIntervals`,
    },
    days: {
      get: `${smapi}/api/Days/WorkingDate`,
      getDateByServiceId: `${smapi}/api/Days/Available/`,
    },
    profile: {
      get: `${smapi}/api/Profiles`
    }
  },
  bookingService: {
    postExaminations: `${apiBookingService}/api/Examinations`,
    resultForm: `${apiBookingService}/api/Examinations/ResultForm`
  },
};

export default apiLinks;
