interface Post {
  id: number;
  title: string;
  content: string;
  tagList: string[];
  userId: number;
  createTime: Date;
  updateTime: Date;
}
export default Post;
