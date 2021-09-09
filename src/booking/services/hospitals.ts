import { httpClient, apiLinks } from '@app/utils';
import { Doctor, Hospital } from '../models/hospital';

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

const getAllDoctor = async (pageIndex: number, pageSize: number): Promise<Doctor> => {
    const result = await httpClient.get({
      url: apiLinks.manageSchedule.doctor.getAllDoctor,
      params: {
        pageIndex: pageIndex,
        pageSize: pageSize
      }
    });
    return result.data as Doctor;
};

const hospitalService = {
  getHospitalByServiceId,
  getHospitalByServiceIdAndDate,
  getAllDoctor
};


export default hospitalService;