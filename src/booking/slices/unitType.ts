import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UnitType } from '../models/unitType';
import bookingServices from '../services/index';

interface State {
    unitTypes: UnitType[];
    loading: boolean;
}

const initialState: State = {
    unitTypes: [],
    loading: false,
};

const getUnitTypes = createAsyncThunk('unitType/getUnitTypes', async () => {
    const result = await bookingServices.unitTypeService.getUnitTypes();
    return result;
});

const slice = createSlice({
    name: 'unitType',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUnitTypes.pending, (state) => ({
            ...state,
            loading: true,
        }));
        builder.addCase(getUnitTypes.fulfilled, (state, { payload }) => ({
            ...state,
            loading: false,
            unitTypes: payload,
        }));
        builder.addCase(getUnitTypes.rejected, (state) => ({
            ...state,
            loading: false,
        }));
    },
});

export { getUnitTypes };

export default slice.reducer;