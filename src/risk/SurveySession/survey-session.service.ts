import { httpClient, apiLinks } from '@app/utils';
import { SurveySession, SurveySessionResponse } from './survey-session.model';

const getSurveySession = async ({
  id = '',
}: {
  id?: string;
}): Promise<SurveySession> => {
  const response = await httpClient.get({
    url: apiLinks.surveySession.getDetails(id),
  });
  return response.data as SurveySession;
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
