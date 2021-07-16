import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SurveySession } from './survey-session.model';
import surveySessionService from './survey-session.service';



interface State {
  surveySession: SurveySession | undefined;
  getSurveySessionsLoading: boolean;
}

const initialState: State = {
  surveySession: undefined,
  getSurveySessionsLoading: false,
};

const getSurveySession = createAsyncThunk(
  'surveySession/getSurveySession',
  async ({ id = '' }: { id: string }) => {
    const result = await surveySessionService.getSurveySession({
      id,
    });
    return result;
  },
);


const slice = createSlice({
  name: 'pqm/post/part',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSurveySession.pending, (state) => ({
      ...state,
      getSurveySessionsLoading: true,
    }));
    builder.addCase(getSurveySession.fulfilled, (state, { payload }) => ({
      ...state,
      surveySession: payload,
      getQuestionTemplateDetaillLoading: false,
    }));
    builder.addCase(getSurveySession.rejected, (state) => ({
      ...state,
      getSurveySessionsLoading: false,
    }));
  },
});

export { getSurveySession };

export default slice.reducer;
