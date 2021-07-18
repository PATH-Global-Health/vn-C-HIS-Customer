import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Profile } from './profile.model';
import profileService from './profile.service';

interface State {
  profile: Profile | undefined;
  getProfileLoading: boolean;
}

const initialState: State = {
  profile: undefined,
  getProfileLoading: false,
};

const getProfile = createAsyncThunk(
  'profile/getProfile',
  async () => {
    const result = await profileService.getProfile();
    return result;
  },
);

const slice = createSlice({
  name: 'pqm/post/part',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => ({
      ...state,
      getProfileLoading: true,
    }));
    builder.addCase(getProfile.fulfilled, (state, { payload }) => ({
      ...state,
      profile: payload,
      getProfileLoading: false,
    }));
    builder.addCase(getProfile.rejected, (state) => ({
      ...state,
      getProfileLoading: false,
    }));
  },
});

export { getProfile };

export default slice.reducer;
