import { Service } from 'egg';
/**
 * Test Service
 */
export default class ArticleService extends Service {
  public async getList(params: any) {
    const { ctx } = this;
    console.log(params);
    // 组合查询条件
    const mongoParams: any = {};
    params.title && (mongoParams.title = { $regex: new RegExp(params.title, 'g') });
    params.author !== undefined && (mongoParams.author = params.author);
    params.tags !== undefined && (mongoParams.tags = { $in: params.tags.split(',') });
    params.category !== undefined && (mongoParams.category = params.category);
    params.releaseStatus !== undefined && (mongoParams.releaseStatus = params.releaseStatus);
    params.source !== undefined && (mongoParams.source = params.source);
    params.createBeginTime !== undefined && params.createEndTime !== undefined && (mongoParams.createTime = { $gt: params.createBeginTime, $lt: params.createEndTime });
    const result = await ctx.model.Article.find(mongoParams).populate('category').populate('tags');
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

  public async updateStatus(responseBody: any) {
    const { ctx } = this;
    console.log(responseBody);
    const result = await ctx.model.Article.findByIdAndUpdate(responseBody.id, {
      releaseStatus: responseBody.status,
    });
    return result;
  }
}
