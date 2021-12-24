import { UserInfo } from 'booking/models/userInfoModel';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BookingModel } from 'booking/models/bookingModel';
import { BookingModelResponse } from 'booking/models/bookingModelResponse';
import { ExaminationListModel } from 'booking/models/examinationListModel';
import { Interval } from 'booking/models/interval';
import { IntervalModel } from 'booking/models/IntervalModel';
import { WorkingCalendar } from '../models/workingCalendar';
import bookingServices from '../services/index';
import { UserProfile } from 'booking/models/userProfile';

interface State {
    workingCalendars: WorkingCalendar[];
    workingCalendar: WorkingCalendar | undefined;
    interval: Interval[];
    intervalBooking: Interval | undefined;
    bookingModel: BookingModel | undefined;
    bookingModelResponse: BookingModelResponse | undefined;
    serviceId: "";
    examinationList: ExaminationListModel,
    userInfo: UserInfo | undefined,
    userProfile: UserProfile | undefined,
    examinationSuccess: boolean,
    loading: boolean;
}

const initialState: State = {
    workingCalendars: [],
    workingCalendar: undefined,
    interval: [],
    intervalBooking: undefined,
    bookingModelResponse: undefined,
    bookingModel: undefined,
    serviceId: "",
    examinationList: {
        data: [],
        errorMessage: null,
        succeed: false,
    },
    userInfo: undefined,
    userProfile: undefined,
    examinationSuccess: false,
    loading: false,
};

const getDateByUnitAndService = createAsyncThunk('workingCalendar/getDateByUnitAndService', async (arg: { unitId: string, serviceId: string }) => {
    const { unitId, serviceId } = arg;
    const result = await bookingServices.workingCalendarService.getDateByUnitAndService(unitId, serviceId);
    return result;
});

const getIntervals = createAsyncThunk('workingCalendar/getInterval', async (dayId: string) => {
    // const result = await bookingServices.workingCalendarService.getIntervals(dayId);
    const result = await bookingServices.workingCalendarService.getIntervals(dayId);
    return result;
});

const getExaminationById = createAsyncThunk('examination/getExaminationById', async (id: string) => {
    const result = await bookingServices.examinationService.getExaminationById(id);
    return result;
});

const getExaminationList = createAsyncThunk('examination/getExaminationList', async () => {
    const result = await bookingServices.examinationService.getExaminationList();
    return result;
});

const postExaminations = createAsyncThunk('examination/postExamination', async (da: BookingModel) => {
    const result = await bookingServices.examinationService.postExaminations(da);
    return result;
});

const getUserInfo = createAsyncThunk('examination/getUserInfo', async () => {
    const result = await bookingServices.examinationService.getUserInfo();
    return result;
});

const putUserProfile = createAsyncThunk('examination/putUserProfile', async (da: UserProfile) => {
    const result = await bookingServices.examinationService.putUserProfile(da);
    return result;
});

const slice = createSlice({
    name: 'workingCaledar',
    initialState,
    reducers: {
        getWorkingCalendarBooking: (state, action) => {
            state.workingCalendar = action.payload;
        },
        getInterBooking: (state, action) => {
            state.intervalBooking = action.payload;
        },
        getBookingModel: (state, action) => {
            state.bookingModel = action.payload;
        },
        getServiceId: (state, action) => {
            state.serviceId = action.payload;
        },
        setInterval: (state, action) => {
            state.interval = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getDateByUnitAndService.pending, (state) => ({
            ...state,
            loading: true,
        }));
        builder.addCase(getDateByUnitAndService.fulfilled, (state, { payload }) => ({
            ...state,
            loading: false,
            workingCalendars: payload,
        }));
        builder.addCase(getDateByUnitAndService.rejected, (state) => ({
            ...state,
            loading: false,
        }));

        builder.addCase(getIntervals.pending, (state) => ({
            ...state,
            loading: true,
        }));
        builder.addCase(getIntervals.fulfilled, (state, { payload }) => ({
            ...state,
            loading: false,
            interval: payload,
        }));
        builder.addCase(getIntervals.rejected, (state) => ({
            ...state,
            loading: false,
        }));

        builder.addCase(postExaminations.pending, (state) => ({
            ...state,
            loading: true,
        }));
        builder.addCase(postExaminations.fulfilled, (state, { payload }) => ({
            ...state,
            loading: false,
            bookingModelResponse: payload,
            examinationSuccess: true,
        }));
        builder.addCase(postExaminations.rejected, (state) => ({
            ...state,
            examinationSuccess: false,
            loading: false,
        }));

        //getExaminationById
        builder.addCase(getExaminationById.pending, (state) => ({
            ...state,
            loading: true,
        }));
        builder.addCase(getExaminationById.fulfilled, (state, { payload }) => ({
            ...state,
            loading: false,
            bookingModelResponse: payload,
            examinationSuccess: true,
        }));
        builder.addCase(getExaminationById.rejected, (state) => ({
            ...state,
            // examinationSuccess: false,
            loading: false,
        }));

        //getExaminationList
        builder.addCase(getExaminationList.pending, (state) => ({
            ...state,
            loading: true,
        }));
        builder.addCase(getExaminationList.fulfilled, (state, { payload }) => ({
            ...state,
            loading: false,
            examinationList: payload,
        }));
        builder.addCase(getExaminationList.rejected, (state) => ({
            ...state,
            loading: false,
        }));

        //getUserInfo
        builder.addCase(getUserInfo.pending, (state) => ({
            ...state,
            getUserInfoLoading: true,
        }));
        builder.addCase(getUserInfo.fulfilled, (state, { payload }) => ({
            ...state,
            userProfile: payload,
            getUserInfoLoading: false,
        }));
        builder.addCase(getUserInfo.rejected, (state) => ({
            ...state,
            getUserInfoLoading: false,
        }));

        //putUserProfile
        builder.addCase(putUserProfile.pending, (state) => ({
            ...state,
            getUserInfoLoading: true,
        }));
        builder.addCase(putUserProfile.fulfilled, (state, { payload }) => ({
            ...state,
            // userProfile: payload,
            getUserInfoLoading: false,
        }));
        builder.addCase(putUserProfile.rejected, (state) => ({
            ...state,
            getUserInfoLoading: false,
        }));
    },
});

export { getDateByUnitAndService, getIntervals, postExaminations, getExaminationList, getUserInfo, putUserProfile, getExaminationById };
export const { getWorkingCalendarBooking, getInterBooking, getBookingModel, getServiceId, setInterval } = slice.actions;

export default slice.reducer;