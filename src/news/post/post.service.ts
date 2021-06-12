import { httpClient, apiLinks } from '@app/utils';
import { PostDetail, PostResponse } from './post.model';

const getPosts = async ({
  pageIndex = 0,
  pageSize = 10,
}: {
  pageIndex?: number;
  pageSize?: number;
}): Promise<PostResponse> => {
  const response = await httpClient.get({
    url: apiLinks.post.get,
    params: {
      pageIndex,
      pageSize,
    },
  });
  return response.data as PostResponse;
};
const getPostDetail = async ({
  postId = '',
}: {
  postId?: string;
}): Promise<PostDetail[]> => {
  const response = await httpClient.get({
    url: apiLinks.post.getDetails(postId),
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return response.data as PostDetail[];
};
const postService = {
  getPosts,
  getPostDetail,
};

export default postService;
