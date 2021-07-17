export interface SurveySessionResult {
  questionId: string,
  answerId?: any,
}
interface SurveyResult {
  id: string;
  description: string;
  fromScore: number;
  toScore: number;
}
export interface SurveySession {
  questionTemplateId: string;
  userId: string;
  result: string;
  surveySessionResults: SurveySessionResult[];
}
export interface SurveySessionResponse {
  userScore: number,
  surveyResult: SurveyResult,
}
