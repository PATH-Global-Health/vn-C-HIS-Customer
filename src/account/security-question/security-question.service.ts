import { Token } from '@app/models/token';
import { SecutiryQuestionAnswer, QuestionResponse, QuestionDetailResponse } from './security-question.model';
import { httpClient, apiLinks } from '@app/utils';

const getQuestions = async (): Promise<QuestionResponse> => {
  const response = await httpClient.get({
    url: apiLinks.securitySetting.getQuestions,
  });
  return response.data as QuestionResponse;
};
const ChangeSecurityQuestionAnswer = async (data: SecutiryQuestionAnswer): Promise<void> => {
  await httpClient.post({
    url: apiLinks.securitySetting.update,
    data,
  });
};
const getQuestionDetail = async ({
  id = '',
}: {
  id?: string;
}): Promise<QuestionDetailResponse> => {
  const response = await httpClient.get({
    url: apiLinks.securitySetting.getDetails(id),
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return response.data as QuestionDetailResponse;
};
const confirmSecurityQuestion = async ({
  username,
  securityQuestionId,
  securityQuestionAnswer
}: {
  username?: string;
  securityQuestionId?: string,
  securityQuestionAnswer?: string;
}): Promise<Token> => {
  const response = await httpClient.post({
    url: apiLinks.securitySetting.confirmSecurity,
    data: {
      username,
      securityQuestionId,
      securityQuestionAnswer
    },
  });
  return response.data as Token;
};
const securityQuestionService = {
  getQuestions,
  ChangeSecurityQuestionAnswer,
  confirmSecurityQuestion,
  getQuestionDetail
};

export default securityQuestionService;
