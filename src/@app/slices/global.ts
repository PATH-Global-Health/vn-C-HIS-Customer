import { createSlice, PayloadAction, CaseReducer } from '@reduxjs/toolkit';

interface State {
  confirmation?: {
    message: string;
    callback: () => void;
  };
}

type CR<T> = CaseReducer<State, PayloadAction<T>>;

interface AddConfirmCallback {
  message: string;
  callback: () => void;
}
const addConfirmCallbackCR: CR<AddConfirmCallback> = (state, action) => ({
  ...state,
  confirmation: {
    ...action.payload,
  },
});

const clearConfirmCallbackCR: CR<void> = (state) => ({
  ...state,
  confirmation: undefined,
});

const slice = createSlice({
  name: 'global',
  initialState: {},
  reducers: {
    addConfirmCallback: addConfirmCallbackCR,
    clearConfirmCallback: clearConfirmCallbackCR,
  },
});

export const { addConfirmCallback, clearConfirmCallback } = slice.actions;

export default slice.reducer;
