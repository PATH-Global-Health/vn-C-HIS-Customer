import { httpClient, apiLinks } from '@app/utils';
import { ServiceForm } from '../models/serviceForm';

const getServiceForms = async (): Promise<ServiceForm[]> => {
    try {
        const result = await httpClient.get({
            url: apiLinks.manageSchedule.serviceForms.get,
        });
        console.log(result.data);
        return result.data as ServiceForm[];
    } catch (error) {
        return [];
    }
};

const serviceFormService = {
    getServiceForms,
};

export default serviceFormService;