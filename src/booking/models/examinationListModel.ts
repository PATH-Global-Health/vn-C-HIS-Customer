import { BookingModel } from "./bookingModel";

export interface ExaminationListModel {
    data: BookingModel[],
    errorMessage: null,
    succeed: boolean,
}