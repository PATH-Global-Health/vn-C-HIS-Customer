import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ServiceForm } from '../models/serviceForm';
import bookingServices from '../services/index';

interface State {
    serviceForms: ServiceForm[];
    loading: boolean;
}

const initialState: State = {
    serviceForms: [],
    loading: false,
};

const getServiceForms = createAsyncThunk('serviceForm/getServiceForms', async () => {
    const result = await bookingServices.serviceFormService.getServiceForms();
    return result;
});

const slice = createSlice({
    name: 'serviceForm',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getServiceForms.pending, (state) => ({
            ...state,
            loading: true,
        }));
        builder.addCase(getServiceForms.fulfilled, (state, { payload }) => ({
            ...state,
            loading: false,
            serviceForms: payload,
        }));
        builder.addCase(getServiceForms.rejected, (state) => ({
            ...state,
            loading: false,
        }));
    },
});

export { getServiceForms };

export default slice.reducer;