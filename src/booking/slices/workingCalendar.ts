import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WorkingCalendar } from '../models/workingCalendar';
import bookingServices from '../services/index';

interface State {
    workingCalendars: WorkingCalendar[];
    interval: object[];
    loading: boolean;
}

const initialState: State = {
    workingCalendars: [],
    interval: [{}],
    loading: false,
};

const getDateByUnitAndService = createAsyncThunk('workingCalendar/getDateByUnitAndService', async (arg: { unitId: string, serviceId: string }) => {
    const { unitId, serviceId} = arg;
    const result = await bookingServices.workingCalendarService.getDateByUnitAndService(unitId, serviceId);
    return result;
});

const getIntervals = createAsyncThunk('workingCalendar/getInterval', async (dayId:string) => {
    // const { unitId, serviceId} = arg;
    const result = await bookingServices.workingCalendarService.getIntervals(dayId);
    return result;
});


const slice = createSlice({
    name: 'workingCaledar',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDateByUnitAndService.pending, (state) => ({
            ...state,
            loading: true,
        }));
        builder.addCase(getDateByUnitAndService.fulfilled, (state, { payload }) => ({
            ...state,
            loading: false,
            workingCalendars: payload,
            // workingCalendars: payload,
            // workingCalendars 
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
    },
});

export { getDateByUnitAndService, getIntervals };

export default slice.reducer;