import { httpClient, apiLinks } from '@app/utils';
import { SurveySession, SurveySessionResponse, SurveySessionDetail } from './survey-session.model';

const getSurveySession = async ({
  userId = '',
  templateId = '',
}: {
  userId?: string;
  templateId?: string
}): Promise<SurveySessionDetail> => {
  const response = await httpClient.get({
    url: apiLinks.surveySession.getDetails({ userId, templateId }),
  });
  return response.data as SurveySessionDetail;
};
const createSurveySession = async (data: SurveySession): Promise<SurveySessionResponse> => {
  const result = await httpClient.post({
    url: apiLinks.surveySession.post,
    data,
  });
  return result.data as SurveySessionResponse;
};

const surveySessionService = {
  getSurveySession,
  createSurveySession,
};

export default surveySessionService;
