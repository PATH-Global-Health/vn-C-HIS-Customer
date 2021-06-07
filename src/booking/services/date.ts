import { httpClient, apiLinks } from '@app/utils';

const getDateBookingByServiceId = async (serviceId: string): Promise<string[]> => {
    try {
        const result = await httpClient.get({
            url: apiLinks.manageSchedule.days.getDateByServiceId + `${serviceId}`,
        });
        console.log(result.data);
        return result.data as string[];
    } catch (error) {
        return [];
    }
};



const dateService = {
    getDateBookingByServiceId,
    // getDateByUnitAndServiceId
};


export default dateService;