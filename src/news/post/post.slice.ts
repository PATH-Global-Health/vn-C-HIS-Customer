import {
  createSlice, createAsyncThunk, PayloadAction,
  CaseReducer,
} from '@reduxjs/toolkit';
import { Post, PostDetail, PostResponse, Tag } from './post.model';
import postService from 'news/post/post.service';

interface Filter { 
  tagId?: string;
}

interface State {
  filter: Filter;
  postList: PostResponse;
  tagList: Tag[],
  parentPostData: Post | null;
  postDetail: PostDetail[],
  getTagLoading: boolean
  getPostLoading: boolean;
  getPostDetailLoading: boolean;
}

const initialState: State = {
  filter: {},
  postList: {
    totalSize: 0,
    pageSize: 0,
    data: [],
  },
  tagList: [],
  parentPostData: null,
  postDetail: [],
  getTagLoading: false,
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

const setFilterCR: CR<Filter> = (state, { payload }) => ({
  ...state,
  filter: payload
})

const getTags = createAsyncThunk('post/getTags', async () => {
  const result = await postService.getTags();
  return result;
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
    setFilter: setFilterCR,
  },
  extraReducers: (builder) => {
    //get posts
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
    //get post detail
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
    //get tags
    builder.addCase(getTags.pending, (state) => ({
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
    }));
  },
});

export { getPosts, getPostDetail, getTags };
export const { setParentPostData, setFilter } = slice.actions;

export default slice.reducer;
