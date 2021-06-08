import { httpClient, apiLinks } from '@app/utils';
import { Hospital } from '../models/hospital';

const getHospitalByServiceId = async (serviceId: string): Promise<Hospital[]> => {
  try {
    const result = await httpClient.get({
      url: apiLinks.manageSchedule.hospital.get + `/${serviceId}`,
    });
    console.log(result.data);
    return result.data as Hospital[];
  } catch (error) {
    return [];
  }
};

const getHospitalByServiceIdAndDate = async (date: string): Promise<Hospital[]> => {
  try {
    const result = await httpClient.get({
      url: apiLinks.manageSchedule.hospital.get + `?serviceId=c1b7411c-52ba-46e4-9a09-08d8b860e829&date=${date}`,
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