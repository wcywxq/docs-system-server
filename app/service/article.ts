import { Service } from 'egg';
/**
 * Test Service
 */
export default class ArticleService extends Service {

  public async getList() {
    const { ctx } = this;
    const result = await ctx.model.Article.find();
    return result;
  }

  public async getItem(id: string) {
    const { ctx } = this;
    const result = await ctx.model.Article.findById(id);
    return result;
  }

  public async addItem() {
    const { ctx, app: { mongoose } } = this;
    const result = ctx.model.Article.create({
      article_id: mongoose.Types.ObjectId(),
      title: 'test',
      author: 'test',
      keywords: [ 'zhangsan', 'lisi' ],
      thumbUrl: 'test',
      // tag: { type: [ String ] },
      // tag_id: { type: [ Schema.Types.ObjectId ], ref: 'Tag' },
      // category: { type: String },
      // category_id: { type: Schema.Types.ObjectId, ref: 'Category' },
      releaseStatus: 0,
      source: 1,
      // createTime: { type: Date, default: Date.now() },
    });
    return result;
  }

  public async updateItem() {
    return 'update item';
  }

  public async deleteItem(id: string) {
    const { ctx } = this;
    const result = await ctx.model.Article.findByIdAndRemove(id);
    return result;
  }
}
