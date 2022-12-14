interface Category {
  id: string;
  description: string;
  isDeleted: boolean;
  dateCreated: string;
}
export interface Tag {
  id: string;
  description: string;
  dateCreated: string;
}
export interface Post {
  id: string;
  description: string;
  dateCreated: string;
  name: string;
  writter: string;
  category: Category;
  tags: Tag[];
}
export interface PostResponse {
  totalSize: number;
  pageSize: number;
  data: Post[];
}
export interface PostDetail {
  id: string;
  description: string;
  dateCreated: string;
  dateUpdated: string;
  order: number;
  type: number;
  content: string;
}