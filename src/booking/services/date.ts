import { httpClient, apiLinks } from '@app/utils';

const getDateBookingByServiceId = async (serviceId: string): Promise<string[]> => {
    try {
        const result = await httpClient.get({
            url: apiLinks.manageSchedule.days.getDateByServiceId + `${serviceId}`,
        });
        return result.data as string[];
    } catch (error) {
        return [];
    }
};



const dateService = {
    getDateBookingByServiceId,
};


export default dateService;