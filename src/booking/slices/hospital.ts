import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Hospital } from '../models/hospital';
import bookingServices from '../services/index';

interface State {
    hospitals: Hospital[];
    loading: boolean;
}

const initialState: State = {
    hospitals: [],
    loading: false,
};

const getHospitalByServiceId = createAsyncThunk('hospital/getHospitalByServiceId', async () => {
    const result = await bookingServices.hospitalService.getHospitalByServiceId();
    return result;
});

const getHospitalByServiceIdAndDate = createAsyncThunk('hospital/getHospitalByServiceIdAndDate', async (date: string) => {
    const result = await bookingServices.hospitalService.getHospitalByServiceIdAndDate(date);
    return result;
});

const slice = createSlice({
    name: 'hospital',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getHospitalByServiceIdAndDate.pending, (state) => ({
            ...state,
            loading: true,
        }));
        builder.addCase(getHospitalByServiceIdAndDate.fulfilled, (state, { payload }) => ({
            ...state,
            loading: false,
            hospitals: payload,
        }));
        builder.addCase(getHospitalByServiceIdAndDate.rejected, (state) => ({
            ...state,
            loading: false,
        }));


    },
});

export { getHospitalByServiceId, getHospitalByServiceIdAndDate };

export default slice.reducer;