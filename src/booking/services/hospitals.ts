import { httpClient, apiLinks } from '@app/utils';
import { Hospital } from '../models/hospital';

const getHospitalByServiceId = async (): Promise<Hospital[]> => {
    try {
      const result = await httpClient.get({
        url: apiLinks.manageSchedule.hospital.get,
      });
      console.log(result.data);
      return result.data as Hospital[];
    } catch (error) {
      return [];
    }
  };

  const getHospitalByServiceIdAndDate = async (date:string): Promise<Hospital[]> => {
    try {
      const result = await httpClient.get({
        url: apiLinks.manageSchedule.hospital.get+`?serviceId=f2490f62-1d28-4edd-362a-08d8a7232229&date=${date}`,
      });
      console.log(result.data);
      return result.data as Hospital[];
    } catch (error) {
      return [];
    }
  };
  
  const hospitalService = {
    getHospitalByServiceId,
    getHospitalByServiceIdAndDate,
  };

  
  export default hospitalService;