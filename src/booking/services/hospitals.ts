import { httpClient, apiLinks } from '@app/utils';
import { Hospital } from '../models/hospital';

const getHospitalByServiceId = async (serviceId: string): Promise<Hospital[]> => {
  try {
    const result = await httpClient.get({
      url: apiLinks.manageSchedule.hospital.get + `/${serviceId}`,
    });
    return result.data as Hospital[];
  } catch (error) {
    return [];
  }
};

const getHospitalByServiceIdAndDate = async (serviceId: string, date: string): Promise<Hospital[]> => {
  try {
    const result = await httpClient.get({
      url: apiLinks.manageSchedule.hospital.get + `/GetByServiceAndDate/${serviceId}/${date}`,
    });
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