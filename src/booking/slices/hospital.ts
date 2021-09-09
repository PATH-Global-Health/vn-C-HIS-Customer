import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Doctor, DoctorData, Hospital } from '../models/hospital';
import bookingServices from '../services/index';

interface State {
    hospitals: Hospital[];
    hospitalBooking: Hospital;
    doctorList: Doctor;
    listDoctorRender: DoctorData[],
    loading: boolean;
}

const initialState: State = {
    hospitals: [],
    listDoctorRender: [],
    doctorList: {
        data: [],
        pageIndex: 0,
        pageSize: 5,
        totalPage: 0,
        totalSize: 0
    },
    hospitalBooking: {
        isDeleted: false,
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

const getHospitalByServiceIdAndDate = createAsyncThunk('hospital/getHospitalByServiceIdAndDate', async (arg: { serviceId: string, date: string }) => {
    const result = await bookingServices.hospitalService.getHospitalByServiceIdAndDate(arg.serviceId, arg.date);
    return result;
});

const getAllDoctor = createAsyncThunk('doctor/getAllDoctor', async (arg: {pageIndex: number, pageSize: number}) => {
    const result = await bookingServices.hospitalService.getAllDoctor(arg.pageIndex, arg.pageSize);
    return result;
});

const slice = createSlice({
    name: 'hospital',
    initialState,
    reducers: {
        getHospitalBooking: (state, action) => {
            state.hospitalBooking = action.payload;
        },
        setListDoctorRender: (state, action) => {
            state.listDoctorRender.push(action.payload);
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

        //getAllDoctor
        builder.addCase(getAllDoctor.pending, (state) => ({
            ...state,
            loading: true,
        }));
        builder.addCase(getAllDoctor.fulfilled, (state, { payload }) => ({
            ...state,
            loading: false,
            doctorList: payload,
            listDoctorRender: [...state.listDoctorRender, ...payload.data]
        }));
        builder.addCase(getAllDoctor.rejected, (state) => ({
            ...state,
            loading: false,
        }));


    },
});

export { getHospitalByServiceId, getHospitalByServiceIdAndDate, getAllDoctor };
export const { getHospitalBooking, setListDoctorRender } = slice.actions;

export default slice.reducer;