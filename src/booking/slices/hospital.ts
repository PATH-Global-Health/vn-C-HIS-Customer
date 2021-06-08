import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Hospital } from '../models/hospital';
import bookingServices from '../services/index';

interface State {
    hospitals: Hospital[];
    hospitalBooking: Hospital;
    loading: boolean;
}

const initialState: State = {
    hospitals: [],
    hospitalBooking: {
        dateCreated: "",
        dateUpdated: "",
        id: "",
        username: "",
        name: "",
        unitTypeId: "",
        address: "",
        province: "",
        district: "",
        ward: "",
        website: "",
        phone: "",
        email: "",
        introduction: "",
    },
    loading: false,
};

const getHospitalByServiceId = createAsyncThunk('hospital/getHospitalByServiceId', async (serviceId: string) => {
    const result = await bookingServices.hospitalService.getHospitalByServiceId(serviceId);
    return result;
});

const getHospitalByServiceIdAndDate = createAsyncThunk('hospital/getHospitalByServiceIdAndDate', async (date: string) => {
    const result = await bookingServices.hospitalService.getHospitalByServiceIdAndDate(date);
    return result;
});

const slice = createSlice({
    name: 'hospital',
    initialState,
    reducers: {
        getHospitalBooking: (state, action) => {
            state.hospitalBooking = action.payload;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(getHospitalByServiceId.pending, (state) => ({
            ...state,
            loading: true,
        }));
        builder.addCase(getHospitalByServiceId.fulfilled, (state, { payload }) => ({
            ...state,
            loading: false,
            hospitals: payload,
        }));
        builder.addCase(getHospitalByServiceId.rejected, (state) => ({
            ...state,
            loading: false,
        }));

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
export const { getHospitalBooking } = slice.actions;

export default slice.reducer;