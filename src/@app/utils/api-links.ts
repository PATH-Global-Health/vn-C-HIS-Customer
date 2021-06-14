const testApi = 'https://jsonplaceholder.typicode.com';
const userUrl = 'https://user.bakco.vn';
const newsApi = 'http://202.78.227.94:31545';
const smapi = 'http://202.78.227.94:30111';
// const smapi = ' https://localhost:44353';
// https://localhost:44353
const apiBookingService = 'http://202.78.227.94:30207';
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
    get: `${newsApi}/api/Post`,
    getDetails: (id: string): string =>
      `${newsApi}/api/Part/${id}`,
    create: `${testApi}/posts`,
    update: `${testApi}/posts/`,
    delete: `${testApi}/posts/`,
  },
  tag: {
    get: `${newsApi}/api/Tag`,
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
