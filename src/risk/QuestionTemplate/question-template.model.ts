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
export interface QuestionTemplate {
  id: string;
  description: string;
  title: string;
  isCompleted: boolean;
  questions: Question[];
  surveyResults: SurveyResult[];
}
export interface QuestionTemplateResponse {
  totalSize: number;
  pageSize: number;
  data: QuestionTemplate[];
}
export type QuestionTemplateDetail = QuestionTemplate;