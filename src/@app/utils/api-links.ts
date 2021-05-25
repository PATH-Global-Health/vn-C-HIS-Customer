const userGateway = 'https://auth.vkhealth.vn';
const testApi = 'https://jsonplaceholder.typicode.com';
const smapi = 'https://localhost:44353';
const testAPiBooking = 'https://localhost:44353/api/';

const apiLinks = {
  auth: {
    token: `${userGateway}/api/Users/Login`,
  },
  manageAccount: {
    create: `${userGateway}/api/Users`,
  },
  manageSchedule: {
    unitTypes: {
      get: `${smapi}/api/UnitTypes`,
    },
    serviceForms: {
      get: `${smapi}/api/ServiceForms`,
    },
    hospital: {
      get: `${smapi}/api/Hospitals/f2490f62-1d28-4edd-362a-08d8a7232229`,
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
  post: {
    get: `${testApi}/posts`,
    create: `${testApi}/posts`,
    update: `${testApi}/posts/`,
    delete: `${testApi}/posts/`,
    getBooking: testAPiBooking,
  },
};

export default apiLinks;
