import { httpClient, apiLinks } from '@app/utils';
import { Post } from './post.model';

const getPosts = async (): Promise<Post[]> => {
  try {
    const result = await httpClient.get({
      url: apiLinks.post.get,
    });
    return result.data as Post[];
  } catch (error) {
    return [];
  }
};

const postService = {
  getPosts,
};

export default postService;
