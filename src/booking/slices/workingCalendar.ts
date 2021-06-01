import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BookingModel } from 'booking/models/bookingModel';
import { BookingModelResponse } from 'booking/models/bookingModelResponse';
import { Hospital } from 'booking/models/hospital';
import { Interval } from 'booking/models/interval';
import { IntervalModel } from 'booking/models/IntervalModel';
import { WorkingCalendar } from '../models/workingCalendar';
import bookingServices from '../services/index';

interface State {
    workingCalendars: WorkingCalendar[];
    workingCalendar: WorkingCalendar;
    interval: Interval[];
    intervalBooking: IntervalModel;
    bookingModel: BookingModel;
    bookingModelResponse: BookingModelResponse;
    loading: boolean;
}

const initialState: State = {
    workingCalendars: [],
    workingCalendar: {
        date: "",
        doctor: {
            description: "",
            id: "",
        },
        room: {
            description: "",
            id: "",
        },
        id: "",
        schedules: {
            from: "",
            to: "",
        },
        service: [{
            id: "",
            description: "",
        }],
        status: false,
        time: "",
    },
    interval: [],
    intervalBooking: {
        from: "",
        id: "",
        isAvailable: false,
        numId: 0,
        status: 0,
        to: "",
    },
    bookingModelResponse: {
        data: {
            interval: {
                id: "",
                from: "",
                to: "",
                numId: 0
            },
            unit: {
                id: "",
                name: "",
                information: "",
                address: "",
                username: "",
            },
            doctor: {
                id: "",
                fullname: "",
            },
            room: {
                id: "",
                name: ""
            },
            service: {
                id: "",
                name: ""
            },
            customer: {
                id: "",
                fullname: "",
                phone: "",
                email: "",
                address: "",
                birthDate: "",
                gender: true,
                provinceCode: "",
                districtCode: "",
                wardCode: "",
                ic: "",
                nation: "",
                passportNumber: "",
                vaccinationCode: ""
            },
            contacts: [
                {
                    fullname: "",
                    phone: "",
                    relationship: ""
                }
            ],
            note: "",
            date: "",
            bookedByUser: "",
            exitInformation: {
                destination: "",
                exitingDate: "",
                entryingDate: ""
            }
        },
        errorMessage: null,
        succeed: false,
    }
    ,
    bookingModel: {
        interval: {
            id: "",
            from: "",
            to: "",
            numId: 0
        },
        unit: {
            id: "",
            name: "",
            information: "",
            address: "",
            username: "",
        },
        doctor: {
            id: "",
            fullname: "",
        },
        room: {
            id: "",
            name: ""
        },
        service: {
            id: "",
            name: ""
        },
        customer: {
            id: "",
            fullname: "",
            phone: "",
            email: "",
            address: "",
            birthDate: "",
            gender: true,
            provinceCode: "",
            districtCode: "",
            wardCode: "",
            ic: "",
            nation: "",
            passportNumber: "",
            vaccinationCode: ""
        },
        contacts: [
            {
                fullname: "",
                phone: "",
                relationship: ""
            }
        ],
        note: "",
        date: "",
        bookedByUser: "",
        exitInformation: {
            destination: "",
            exitingDate: "",
            entryingDate: ""
        }
    },
    loading: false,
};

const getDateByUnitAndService = createAsyncThunk('workingCalendar/getDateByUnitAndService', async (arg: { unitId: string, serviceId: string }) => {
    const { unitId, serviceId } = arg;
    const result = await bookingServices.workingCalendarService.getDateByUnitAndService(unitId, serviceId);
    return result;
});

const getIntervals = createAsyncThunk('workingCalendar/getInterval', async (dayId: string) => {
    const result = await bookingServices.workingCalendarService.getIntervals(dayId);
    return result;
});

const postExaminations = createAsyncThunk('Examination/postExamination', async (da: BookingModel) => {
    const result = await bookingServices.examinationService.postExaminations(da);
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
            // workingCalendars: payload,
            // workingCalendars 
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
            // workingCalendars: payload,
            // workingCalendars 
        }));
        builder.addCase(postExaminations.rejected, (state) => ({
            ...state,
            loading: false,
        }));
    },
});

export { getDateByUnitAndService, getIntervals, postExaminations };
export const { getWorkingCalendarBooking, getInterBooking, getBookingModel } = slice.actions;

export default slice.reducer;