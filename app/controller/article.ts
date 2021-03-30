import { Controller } from 'egg';

export default class ArticleController extends Controller {
  /**
   * @description 获取文章列表
   */
  public async all() {
    const { ctx } = this;
    try {
      const result = await ctx.service.article.getList(ctx.query);
      ctx.body = { resultCode: 0, errorMsg: null, data: result };
    } catch (err) {
      ctx.body = { resultCode: 1, errorMsg: (err as Error).message };
    }
  }
  /**
   * @description 获取文章
   */
  public async item() {
    const { ctx } = this;
    try {
      const result = await ctx.service.article.getItem(ctx.query.id);
      ctx.body = { resultCode: 0, errorMsg: null, data: result };
    } catch (err) {
      ctx.body = { resultCode: 1, errorMsg: (err as Error).message };
    }
  }
  /**
   * @description 添加文章
   */
  public async add() {
    const { ctx } = this;
    try {
      const result = await ctx.service.article.addItem(ctx.request.body);
      ctx.body = { resultCode: 0, errorMsg: null, data: result };
    } catch (err) {
      ctx.body = { resultCode: 1, errorMsg: (err as Error).message };
    }
  }
  /**
   * @description 更新文章信息
   */
  public async update() {
    const { ctx } = this;
    ctx.body = await ctx.service.article.updateItem();
  }
  /**
   * @description 删除文章
   */
  public async delete() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      const result = await ctx.service.article.deleteItem(id);
      ctx.body = { resultCode: 0, errorMsg: null, data: result };
    } catch (err) {
      ctx.body = { resultCode: 1, errorMsg: (err as Error).message };
    }
  }
  /**
   * @description 更新文章发布状态
   */
  public async updateStatus() {
    const { ctx } = this;
    try {
      const result = await ctx.service.article.updateStatus(ctx.request.body);
      ctx.body = { resultCode: 0, errorMsg: null, data: result };
    } catch (err) {
      ctx.body = { resultCode: 1, errorMsg: (err as Error).message };
    }
  }
}
