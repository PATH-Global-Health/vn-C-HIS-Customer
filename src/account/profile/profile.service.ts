import { httpClient, apiLinks } from '@app/utils';
import { Profile, ProfileUM } from './profile.model';

const getProfile = async (): Promise<Profile> => {
  const result = await httpClient.get({
    url: apiLinks.profile.get,
  });
  return result.data as Profile;
};
const updateProfile = async (data: ProfileUM): Promise<void> => {
  const result = await httpClient.put({
    url: apiLinks.profile.update,
    data,
  });
  return result.data;
};
const profileService = {
  getProfile,
  updateProfile
};

export default profileService;
