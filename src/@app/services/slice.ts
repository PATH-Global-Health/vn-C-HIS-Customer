import { createAsyncThunk } from '@reduxjs/toolkit';
import bookingService from './auth';
const getBookings = createAsyncThunk('booking/getBookings', async () => {
    const result = await bookingService.testApi();
    // console.log(result);
})

export { getBookings };