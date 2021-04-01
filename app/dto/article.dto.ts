export type QueryArticleDto = Partial<{
  title: string;
  author: string;
  tags: string;
  category: string;
  isPublish: 0 | 1;
  source: 0 | 1;
  createBeginTime: Date;
  createEndTime: Date;
}>;

export type CreateArticleDto = {
  author: string;
  title: string;
  category: string;
  desc: string;
  tag: string[];
  content: string;
  thumbUrl: string;
};
