const testApi = 'https://jsonplaceholder.typicode.com';
const userUrl = 'https://user.bakco.vn';
const smapi = 'http://202.78.227.94:30111';
// https://localhost:44353
const apiBookingService = 'http://202.78.227.94:30207';
// https://localhost:44308/

const apiLinks = {
  auth: {
    token: `${userUrl}/api/Users/Login`,
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
    get: `${testApi}/posts`,
    create: `${testApi}/posts`,
    update: `${testApi}/posts/`,
    delete: `${testApi}/posts/`,
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
    postExaminations: `${apiBookingService}/api/Examinations`
  },
};

export default apiLinks;
