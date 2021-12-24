export interface Question {
  id: string;
  question: string;
}
interface QuestionAnswer {
  id: string,
  answer: string
}
export interface SecutiryQuestionAnswer {
  password: string,
  questionAnswer: QuestionAnswer,
}
export interface QuestionResponse {
  data: Question[];
}
export interface QuestionDetailResponse {
  data: Question;
}