import { httpClient, apiLinks } from '@app/utils';
import { QuestionTemplateDetail, QuestionTemplateResponse, QuestionTemplate } from './question-template.model';

const getQuestionTemplate = async ({
  pageIndex = 0,
  pageSize = 10,
}: {
  pageIndex?: number;
  pageSize?: number;
}): Promise<QuestionTemplateResponse> => {
  const response = await httpClient.get({
    url: apiLinks.questionTemplate.get,
    params: {
      pageIndex,
      pageSize,
    },
  });
  return response.data as QuestionTemplateResponse;
};
const getQuestionTemplateDetail = async ({
  id = '',
}: {
  id?: string;
}): Promise<QuestionTemplateDetail> => {
  const response = await httpClient.get({
    url: apiLinks.questionTemplate.getDetails(id),
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return response.data as QuestionTemplateDetail;
};
const riskService = {
  getQuestionTemplate,
  getQuestionTemplateDetail,
  //getTags,
};

export default riskService;
