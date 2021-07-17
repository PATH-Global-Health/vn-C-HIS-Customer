const testApi = 'https://jsonplaceholder.typicode.com';
const userUrl = 'https://user.bakco.vn';
const newsApi = 'http://202.78.227.94:31545';
const smapi = 'http://202.78.227.174:30111';
// http://202.78.227.174:30111/
const cmsApi = 'http://202.78.227.174:44322';

// const smapi = ' https://localhost:44353';
// https://localhost:44353
const apiBookingService = 'http://202.78.227.174:12345';
// const apiBookingService = 'https://localhost:44308';
// https://localhost:44308/

const apiLinks = {
  auth: {
    token: `${userUrl}/api/Users/Login`,
    userInfo: `${userUrl}/api/Users/GetUserInfo`
  },
  manageAccount: {
    create: `${userUrl}/api/Users`,
    changePassword: `${userUrl}/api/Users/ChangePassword`,
  },
  forgetPassword: {
    generateOTP: `${userUrl}/api/Users/ResetPassword/GenerateOTP`,
    confirmOTP: `${userUrl}/api/Users/ResetPassword/ConfirmOTP`,
  },
  post: {
    get: `${cmsApi}/api/Post`,
    getDetails: (id: string): string =>
      `${cmsApi}/Part/${id}`,
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
    getDetails: (id: string): string => `${cmsApi}/api/SurveySession/${id}`,
    post: `${cmsApi}/api/SurveySession`,
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
  },
};

export default apiLinks;
