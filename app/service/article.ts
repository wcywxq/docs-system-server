import { Service } from 'egg';
/**
 * Test Service
 */
export default class ArticleService extends Service {
  public async getList(params: any) {
    const { ctx } = this;
    // 组合查询条件
    const mongoParams: any = {};
    params.title && (mongoParams.title = { $regex: new RegExp(params.title, 'g') });
    params.author && (mongoParams.author = params.author);
    params.tags && (mongoParams.tags = { $in: params.tags.split(',') });
    params.category && (mongoParams.category = params.category);
    params.releaseStatus && (mongoParams.releaseStatus = params.releaseStatus);
    params.source && (mongoParams.source = params.source);
    params.createBeginTime && params.createEndTime && (mongoParams.createTime = { $gt: params.createBeginTime, $lt: params.createEndTime });
    const result = await ctx.model.Article.find(mongoParams)
      .populate('category')
      .populate('tags');
    return result;
  }

  public async getItem(id: string) {
    const { ctx } = this;
    const result = await ctx.model.Article.findById(id);
    return result;
  }

  public async addItem(responseBody: any) {
    const { ctx } = this;
    const result = ctx.model.Article.create({
      author: 'magic',
      ...responseBody,
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
