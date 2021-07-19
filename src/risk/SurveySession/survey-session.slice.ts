import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SurveySession, SurveySessionDetail } from './survey-session.model';
import surveySessionService from './survey-session.service';


interface State {
  surveySession: SurveySessionDetail | undefined;
  getSurveySessionsLoading: boolean;
}

const initialState: State = {
  surveySession: undefined,
  getSurveySessionsLoading: false,
};

const getSurveySession = createAsyncThunk(
  'surveySession/getSurveySession',
  async ({ userId = '', templateId = '' }: { userId: string, templateId: string }) => {
    const result = await surveySessionService.getSurveySession({
      userId,
      templateId
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
      surveySession: undefined,
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
