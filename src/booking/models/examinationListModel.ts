import { BookingModel } from "./bookingModel";

export interface ExaminationListModel {
    data: BookingModel[],
    errorMessage: null,
    succeed: boolean,
}

export interface ExaminationUpdate {
  id: string,
  status?: number,
  note?: string,
  rate?: string,
  typeRating?: string,
  desc?: string,
  consultingContent?: ConsultingContent | {},
  testingContent?: TestingContent | {},
}

export interface ConsultingContent {
  type: string,
  content: string,
  result: string,
  note: string
}

export interface TestingContent {
  content: string,
  result: string,
  note: string
}

export enum ExaminationStatus {
    UNFINISHED = 1,
    FINISHED = 2,
    CANCELED_BY_CUSTOMER = 3,
    NOT_DOING = 4,
    CANCELED = 5,
    RESULTED = 6,
  }

  export enum ExaminationService {
    TESTING = "f2490f62-1d28-4edd-362a-08d8a7232229",
    CONSULTATION = "9f9e8dd3-890e-4ae5-2952-08d92b03ae12",
  }