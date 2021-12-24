import { httpClient, apiLinks } from '@app/utils';
import { Laytest, LaytestResponse } from './laytest.model';

const getLaytests = async ({
  username = '',
  pageIndex = 0,
  pageSize = 10,
}: {
  username?: string;
  pageIndex?: number;
  pageSize?: number;
}): Promise<LaytestResponse> => {
  const response = await httpClient.get({
    url: apiLinks.laytest.get,
    params: {
      username,
      pageIndex,
      pageSize,
    },
  });
  return response.data as LaytestResponse;
};
const updateLaytest = async ({
  id = '',
  resultTesting = '',
}: {
  id?: string;
  resultTesting?: string;

}): Promise<void> => {
  await httpClient.put({
    url: apiLinks.laytest.update,
    data: {
      id,
      resultTesting,
    }
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
};
const LaytestService = {
  getLaytests,
  updateLaytest
};

export default LaytestService;
