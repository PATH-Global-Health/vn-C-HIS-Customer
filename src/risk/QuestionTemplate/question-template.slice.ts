import {
  createSlice, createAsyncThunk, PayloadAction,
  CaseReducer,
} from '@reduxjs/toolkit';
import { QuestionTemplate, QuestionTemplateDetail, QuestionTemplateResponse } from './question-template.model';
import riskService from './question-template.service';


interface State {
  questionTemplateList: QuestionTemplateResponse;
  parentQuestionTemplateData: QuestionTemplate | undefined;
  questionTemplateDetail: QuestionTemplateDetail | undefined,
  getQuestionTemplateLoading: boolean;
  getQuestionTemplateDetaillLoading: boolean;
  handleRisk: {
    type?: string,
    data?: string,
  }
}

const initialState: State = {
  questionTemplateList: {
    totalSize: 0,
    pageSize: 0,
    data: [],
  },
  parentQuestionTemplateData: undefined,
  questionTemplateDetail: undefined,
  getQuestionTemplateLoading: false,
  getQuestionTemplateDetaillLoading: false,
  handleRisk: {
    type: undefined,
    data: undefined,
  }
};
type CR<T> = CaseReducer<State, PayloadAction<T>>;
const setParentQuestionTemplateCR: CR<{
  data: QuestionTemplate,
}> = (state, action) => ({
  ...state,
  parentPostData: action.payload.data,
});

const setHandeRiskCR: CR<{
  type?: string,
  data?: string,
}> = (state, action) => ({
  ...state,
  handleRisk: action.payload,
})

/* const getQuestionTemplates = createAsyncThunk(
  'questionTemplate/getQuestionTemplates',
  async ({
    pageIndex = 0,
    pageSize = 10,
  }: {
    pageIndex?: number;
    pageSize?: number;
  }) => {
    const result = await riskService.getQuestionTemplate({
      pageIndex,
      pageSize,
    });
    return result;
  },
); */
const getQuestionTemplates = createAsyncThunk(
  'questionTemplate/getQuestionTemplates',
  async ({
    pageIndex = 1,
    pageSize = 10,
  }: {
    pageIndex?: number;
    pageSize?: number;
  }) => {
    const result = await riskService.getQuestionTemplate({
      pageIndex,
      pageSize,
    });
    return result;
  },
);

const getQuestionTemplatesDetail = createAsyncThunk(
  'questionTemplatesDetail/getQuestionTemplatesDetail',
  async ({ id = '' }: { id: string }) => {
    const result = await riskService.getQuestionTemplateDetail({
      id,
    });
    return result;
  },
);


const slice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setParentQuestionTemplateData: setParentQuestionTemplateCR,
    setHandeRisk: setHandeRiskCR,
  },
  extraReducers: (builder) => {
    //get posts
    builder.addCase(getQuestionTemplates.pending, (state) => ({
      ...state,
      getQuestionTemplateLoading: true,
    }));
    builder.addCase(getQuestionTemplates.fulfilled, (state, { payload }) => ({
      ...state,
      questionTemplateList: payload,
      getQuestionTemplateLoading: false,
    }));
    builder.addCase(getQuestionTemplates.rejected, (state) => ({
      ...state,
      getQuestionTemplateLoading: false,
    }));
    //get post detail
    builder.addCase(getQuestionTemplatesDetail.pending, (state) => ({
      ...state,
      questionTemplateDetail: undefined,
      getQuestionTemplateDetaillLoading: true,
    }));
    builder.addCase(getQuestionTemplatesDetail.fulfilled, (state, { payload }) => ({
      ...state,
      questionTemplateDetail: payload,
      getQuestionTemplateDetaillLoading: false,
    }));
    builder.addCase(getQuestionTemplatesDetail.rejected, (state) => ({
      ...state,
      getQuestionTemplateDetaillLoading: false,
    }));
    //get tags
    /*    builder.addCase(getTags.pending, (state) => ({
         ...state,
         getTagLoading: true,
       }));
       builder.addCase(getTags.fulfilled, (state, { payload }) => ({
         ...state,
         tagList: payload,
         getTagLoading: false,
       }));
       builder.addCase(getTags.rejected, (state) => ({
         ...state,
         getTagLoading: false,
       })); */
  },
});

export { getQuestionTemplates, getQuestionTemplatesDetail };
export const { setParentQuestionTemplateData, setHandeRisk } = slice.actions;

export default slice.reducer;
