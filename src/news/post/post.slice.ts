import {
  createSlice, createAsyncThunk, PayloadAction,
  CaseReducer,
} from '@reduxjs/toolkit';
import { Post, PostDetail, PostResponse } from './post.model';
import postService from 'news/post/post.service';

interface State {
  postList: PostResponse;
  parentPostData: Post | null;
  postDetail: PostDetail[],
  getPostLoading: boolean;
  getPostDetailLoading: boolean;
}

const initialState: State = {
  postList: {
    totalSize: 0,
    pageSize: 0,
    data: [],
  },
  parentPostData: null,
  postDetail: [],
  getPostLoading: false,
  getPostDetailLoading: false,
};
type CR<T> = CaseReducer<State, PayloadAction<T>>;
const setParentPostDataCR: CR<{
  data: Post,
}> = (state, action) => ({
  ...state,
  parentPostData: action.payload.data,
});
const getPosts = createAsyncThunk(
  'post/getPosts',
  async ({
    pageIndex = 0,
    pageSize = 10,
  }: {
    pageIndex?: number;
    pageSize?: number;
  }) => {
    const result = await postService.getPosts({
      pageIndex,
      pageSize,
    });
    return result;
  },
);

const getPostDetail = createAsyncThunk(
  'post/getPostDetails',
  async ({ postId = '' }: { postId: string }) => {
    const result = await postService.getPostDetail({
      postId,
    });
    return result;
  },
);

const slice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setParentPostData: setParentPostDataCR,
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => ({
      ...state,
      getPostLoading: true,
    }));
    builder.addCase(getPosts.fulfilled, (state, { payload }) => ({
      ...state,
      postList: payload,
      getPostLoading: false,
    }));
    builder.addCase(getPosts.rejected, (state) => ({
      ...state,
      getPostLoading: false,
    }));
    builder.addCase(getPostDetail.pending, (state) => ({
      ...state,
      getPostDetailLoading: true,
    }));
    builder.addCase(getPostDetail.fulfilled, (state, { payload }) => ({
      ...state,
      postDetail: payload,
      getPostDetailLoading: false,
    }));
    builder.addCase(getPostDetail.rejected, (state) => ({
      ...state,
      getPostDetailLoading: false,
    }));
  },
});

export { getPosts, getPostDetail };
export const { setParentPostData } = slice.actions;

export default slice.reducer;
