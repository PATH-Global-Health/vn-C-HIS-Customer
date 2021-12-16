// const userUrl = 'https://user-management.bakco.vn/api';
// const smapi = 'https://schedule-management.bakco.vn/api';
// const cmsApi = 'https://mini-cms.bakco.vn/api';
// const apiBookingService = 'https://booking-management.bakco.vn/api';

const gatewayUrl = 'https://chis-api.bakco.vn/v1';
const userUrl = `${gatewayUrl}/auth`;
const smapi = `${gatewayUrl}/schedule`;
const cmsApi = `${gatewayUrl}/mini-cms`;
const apiBookingService = `${gatewayUrl}/booking`;

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
    logout: `${userUrl}/Users/LogOut`,
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
      get: `${smapi}/UnitTypes`,
    },
    serviceForms: {
      get: `${smapi}/ServiceForms`,
    },
    hospital: {
      get: `${smapi}/Hospitals`,
      getHospitalImage: `${smapi}/Hospitals/Logo/`
    },
    workingCalendar: {
      getDaysByUnitAndService: `${smapi}/WorkingCalendars/GetDaysByUnitAndService`,
      getInterval: `${smapi}/WorkingCalendars/GetIntervals`,
      getIntervalsWithDayId: `${smapi}/WorkingCalendars/GetIntervalsWithDayId`,
    },
    days: {
      get: `${smapi}/Days/WorkingDate`,
      getDateByServiceId: `${smapi}/Days/Available/`,
    },
    profile: {
      get: `${smapi}/Profiles`
    },
    doctor: {
      getAllDoctor: `${smapi}/Doctors/GetAllDoctor`
    }
  },
  bookingService: {
    postExaminations: `${apiBookingService}/Examinations`,
    resultForm: `${apiBookingService}/Examinations/ResultForm`
  },
};

export default apiLinks;