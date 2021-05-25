import { httpClient, apiLinks } from '@app/utils';
import { UnitType } from '../models/unitType';

const getUnitTypes = async (): Promise<UnitType[]> => {
    try {
      const result = await httpClient.get({
        url: apiLinks.manageSchedule.unitTypes.get,
      });
      console.log(result.data);
      return result.data as UnitType[];
    } catch (error) {
      return [];
    }
  };
  
  const unitTypeService = {
    getUnitTypes,
  };
  
  export default unitTypeService;