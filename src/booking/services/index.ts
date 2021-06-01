import unitTypeService from './unitTypes';
import serviceFormService from './serviceForms';
import hospitalService from './hospitals';
import workingCalendarService from './workingCalendars';
import dateService from './date';
import examinationService from './examinations'
const bookingServices = {
    examinationService,
    dateService,
    unitTypeService,
    serviceFormService,
    hospitalService,
    workingCalendarService,
}
export default bookingServices;