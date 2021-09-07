import { httpClient, apiLinks } from '@app/utils';
import { Tag, PostDetail, PostResponse } from './post.model';

const getPosts = async ({
  pageIndex = 0,
  pageSize = 10,
  searchText = '',
}: {
  pageIndex?: number;
  pageSize?: number;
  searchText?: string;
}): Promise<PostResponse> => {
  const response = await httpClient.get({
    url: apiLinks.post.get,
    params: {
      pageIndex,
      pageSize,
      searchText,
    },
  });
  return response.data as PostResponse;
};
const getTags = async (): Promise<Tag[]> => {
  try {
    const result = await httpClient.get({
      url: apiLinks.tag.get,
    });
    return result.data as Tag[];
  } catch (error) {
    return [];
  }
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
  getTags,
};

export default postService;
