export interface SurveySessionResult {
  questionId: string,
  answerId?: any,
}
interface Answer {
  id: string;
  score: number;
  description: string;
  isDeleted: boolean;
  dateCreated: string;
  dateUpdated: string;
}
interface Question {
  id: string;
  description: string;
  isMultipleChoice: boolean;
  answers: Answer[];
}
interface SurveyResult {
  id: string;
  description: string;
  fromScore: number;
  toScore: number;
}
interface SurveyResultDetail {
  question: Question,
  answer: Answer,
}
export interface SurveySession {
  questionTemplateId: string;
  userId?: string;
  result: string;
  surveySessionResults: SurveySessionResult[];
}
export interface SurveySessionResponse {
  userScore: number,
  surveyResult: SurveyResult,
}
export interface SurveySessionDetail {
  id: string,
  userId: string,
  result: string,
  questionTemplateId: string,
  surveySessionResults?: SurveyResultDetail[],
}
