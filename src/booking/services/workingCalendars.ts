import { httpClient, apiLinks } from '@app/utils';
import { Interval } from 'booking/models/interval';
import { WorkingCalendar } from 'booking/models/workingCalendar';
// import { UnitType } from '../models/unitType';

const getDateByUnitAndService = async (unitId: string, serviceId: string): Promise<WorkingCalendar[]> => {
  try {
      const result = await httpClient.get({
          url: apiLinks.manageSchedule.workingCalendar.getDaysByUnitAndService + `?unitId=${unitId}` + `&serviceId=${serviceId}`,
      });
      return result.data as WorkingCalendar[];
  } catch (error) {
      return [];
  }
};

  const getIntervals = async (dayId: string): Promise<Interval[]> => {
    try {
      const result = await httpClient.get({
        // url: apiLinks.manageSchedule.workingCalendar.getInterval + `/${dayId}`,
        url: apiLinks.manageSchedule.workingCalendar.getIntervalsWithDayId + `/${dayId}`,
      });
      return result.data as [];
    } catch (error) {
      return [];
    }
  };
  
  const workingCalendarService = {
    getIntervals,
    getDateByUnitAndService,
  };
  
  export default workingCalendarService;