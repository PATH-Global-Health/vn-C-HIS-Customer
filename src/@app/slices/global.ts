import { createSlice, PayloadAction, CaseReducer } from '@reduxjs/toolkit';

type CR<T> = CaseReducer<State, PayloadAction<T>>;

interface State {
  appMenu: boolean;
  confirmation?: {
    message: string;
    callback: () => void;
  };
}
interface AddConfirmCallback {
  message: string;
  callback: () => void;
}

const initialState: State = {
  appMenu: false,
}

const setAppMenuCR: CR<boolean> = (state, action) => ({
  ...state,
  appMenu: action.payload,
})

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
  initialState,
  reducers: {
    setAppMenu: setAppMenuCR,
    addConfirmCallback: addConfirmCallbackCR,
    clearConfirmCallback: clearConfirmCallbackCR,
  },
});

export const { setAppMenu, addConfirmCallback, clearConfirmCallback } = slice.actions;

export default slice.reducer;
