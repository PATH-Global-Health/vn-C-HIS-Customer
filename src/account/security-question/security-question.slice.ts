import {
  createSlice, createAsyncThunk, PayloadAction,
  CaseReducer,
} from '@reduxjs/toolkit';
import { QuestionResponse, QuestionDetailResponse } from './security-question.model';
import securityQuestionService from './security-question.service';


interface State {
  questions: QuestionResponse;
  questionDetail?: QuestionDetailResponse;
  getQuestionLoading: boolean;
  getQuestionDetailLoading: boolean;
}

const initialState: State = {
  questions: {
    data: [],
  },
  questionDetail: undefined,
  getQuestionLoading: false,
  getQuestionDetailLoading: false,
};
type CR<T> = CaseReducer<State, PayloadAction<T>>;

const getQuestions = createAsyncThunk('question/getQuestions', async () => {
  const result = await securityQuestionService.getQuestions();
  return result;
});
const getQuestionDetail = createAsyncThunk(
  'question/getQuestionDetail',
  async ({ id = '' }: { id: string }) => {
    const result = await securityQuestionService.getQuestionDetail({
      id,
    });
    return result;
  },
);

const slice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get questions
    builder.addCase(getQuestions.pending, (state) => ({
      ...state,
      getQuestionLoading: true,
    }));
    builder.addCase(getQuestions.fulfilled, (state, { payload }) => ({
      ...state,
      questions: payload,
      getQuestionLoading: false,
    }));
    builder.addCase(getQuestions.rejected, (state) => ({
      ...state,
      getQuestionLoading: false,
    }));
    //get question detail
    builder.addCase(getQuestionDetail.pending, (state) => ({
      ...state,
      getQuestionDetailLoading: true,
    }));
    builder.addCase(getQuestionDetail.fulfilled, (state, { payload }) => ({
      ...state,
      questionDetail: payload,
      getQuestionDetailLoading: false,
    }));
    builder.addCase(getQuestionDetail.rejected, (state) => ({
      ...state,
      getQuestionDetailLoading: false,
    }));
  },
});

export { getQuestions, getQuestionDetail };

export default slice.reducer;
