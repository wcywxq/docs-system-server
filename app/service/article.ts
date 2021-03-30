import { Service } from 'egg';
/**
 * Test Service
 */
export default class ArticleService extends Service {
  /**
   * @description 获取全部文章
   */
  public async getList(params: any) {
    const { ctx } = this;
    // 组合查询条件
    const mongoParams: any = {};
    params.title !== undefined && (mongoParams.title = { $regex: new RegExp(params.title, 'g') });
    params.author !== undefined && (mongoParams.author = params.author);
    params.tags !== undefined && (mongoParams.tags = { $in: params.tags.split(',') });
    params.category !== undefined && (mongoParams.category = params.category);
    params.isPublish !== undefined && (mongoParams.isPublish = params.isPublish);
    params.source !== undefined && (mongoParams.source = params.source);
    params.createBeginTime !== undefined && params.createEndTime !== undefined && (mongoParams.createTime = { $gt: params.createBeginTime, $lt: params.createEndTime });
    const result = await ctx.model.Article.find(mongoParams).populate('category').populate('tags');
    return result;
  }
  /**
   * @description 获取文章
   */
  public async getItem(id: string) {
    const { ctx } = this;
    const result = await ctx.model.Article.findById(id);
    return result;
  }
  /**
   * @description 添加文章
   */
  public async addItem(responseBody: any) {
    const { ctx } = this;
    const result = ctx.model.Article.create({
      author: 'magic',
      ...responseBody,
    });
    return result;
  }
  /**
   * @description 更新文章信息
   */
  public async updateItem() {
    return 'update item';
  }
  /**
   * @description 删除文章
   */
  public async deleteItem(id: string) {
    const { ctx } = this;
    const result = await ctx.model.Article.findByIdAndRemove(id);
    return result;
  }
  /**
   * @description 更新发布状态
   */
  public async updateStatus(responseBody: any) {
    const { ctx } = this;
    console.log(responseBody);
    const result = await ctx.model.Article.findByIdAndUpdate(responseBody.id, {
      isPublish: responseBody.isPublish,
    });
    return result;
  }
}
