import {
  createSlice, createAsyncThunk, PayloadAction,
  CaseReducer,
} from '@reduxjs/toolkit';
import postService from 'news/post/post.service';
import { Laytest, LaytestResponse } from './laytest.model';
import LaytestService from './laytest.service';


interface State {
  laytestList: LaytestResponse;
  laytestDetail: Laytest | null;
  getLaytestLoading: boolean
}

const initialState: State = {
  laytestDetail: null,
  laytestList: {
    totalSize: 0,
    pageSize: 0,
    data: [],
  },
  getLaytestLoading: false,
};

type CR<T> = CaseReducer<State, PayloadAction<T>>;
const setLaytestDetailCR: CR<{
  data: Laytest,
}> = (state, action) => ({
  ...state,
  laytestDetail: action.payload.data,
});
const getLaytests = createAsyncThunk(
  'laytest/getLaytest',
  async ({
    pageIndex = 0,
    pageSize = 10,
  }: {
    pageIndex?: number;
    pageSize?: number;
  }) => {
    const result = await LaytestService.getLaytests({
      pageIndex,
      pageSize
    });
    return result;
  },
);

const slice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setLaytestDetail: setLaytestDetailCR,
  },
  extraReducers: (builder) => {
    //get laytests
    builder.addCase(getLaytests.pending, (state) => ({
      ...state,
      getLaytestLoading: true,
    }));
    builder.addCase(getLaytests.fulfilled, (state, { payload }) => ({
      ...state,
      laytestList: payload,
      getLaytestLoading: false,
    }));
    builder.addCase(getLaytests.rejected, (state) => ({
      ...state,
      getLaytestLoading: false,
    }));
  },

});

export { getLaytests };

export const { setLaytestDetail } = slice.actions;
export default slice.reducer;
