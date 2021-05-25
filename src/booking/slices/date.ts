import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import { dateBooking } from '.';
import { DateBooking } from '../models/dateBooking';
import bookingServices from '../services/index';

interface State {
    dateBookings: string[];
    dateBooking: string;
    loading: boolean;
}

const initialState: State = {
    dateBookings: [],
    dateBooking: "",
    loading: false,
};

const getDateByServiceId = createAsyncThunk('date/getDateBookingByServiceId', async (serviceId: string) => {
    const result = await bookingServices.dateService.getDateBookingByServiceId(serviceId);
    return result;
});

// const getDateBooking = () => {
//     const result = await bookingServices.dateService.getDateBookingByServiceId(serviceId);
//     return result;
// });

const slice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        getDateBooking: (state, action) => {
            state.dateBooking = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getDateByServiceId.pending, (state) => ({
            ...state,
            loading: true,
        }));
        builder.addCase(getDateByServiceId.fulfilled, (state, { payload }) => ({
            ...state,
            loading: false,
            dateBookings: payload,
        }));
        builder.addCase(getDateByServiceId.rejected, (state) => ({
            ...state,
            loading: false,
        }));

        // builder.addCase(getDateBooking(), (state, {payload}))
    },
});

export { getDateByServiceId };
export const {getDateBooking} = slice.actions;

export default slice.reducer;