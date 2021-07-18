import { httpClient, apiLinks } from '@app/utils';
import { Profile, ProfileUM } from './profile.model';


const getProfile = async ({
  userId = '',
}: {
  userId: string;
}): Promise<Profile> => {
  const response = await httpClient.get({
    url: apiLinks.post.getDetails(userId = '',
    ),
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return response.data as Profile;
};
const updateProfile = async (data: ProfileUM): Promise<void> => {
  const result = await httpClient.post({
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
