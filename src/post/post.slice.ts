import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from './post.model';
import postService from '../post/post.service';

interface State {
  postList: Post[];
  loading: boolean;
}

const initialState: State = {
  postList: [],
  loading: false,
};

const getPosts = createAsyncThunk('post/getPosts', async () => {
  const result = await postService.getPosts();
  return result;
});

const slice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(getPosts.fulfilled, (state, { payload }) => ({
      ...state,
      loading: false,
      postList: payload,
    }));
    builder.addCase(getPosts.rejected, (state) => ({
      ...state,
      loading: false,
    }));
  },
});

export { getPosts };

export default slice.reducer;
