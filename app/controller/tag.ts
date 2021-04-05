import { Controller } from 'egg';

export default class TagController extends Controller {
  /**
   * @description 获取全部标签
   */
  public async all() {
    const { ctx } = this;
    try {
      const result = await ctx.service.tag.getList(ctx.query);
      ctx.body = { resultCode: 0, errorMsg: null, data: result };
    } catch (err) {
      ctx.body = { resultCode: 1, errorMsg: (err as Error).message };
    }
  }
  /**
   * @description 获取标签
   */
  public async item() {
    const { ctx } = this;
    try {
      const result = await ctx.service.tag.getItem(ctx.params.id);
      ctx.body = { resultCode: 0, errorMsg: null, data: result };
    } catch (err) {
      ctx.body = { resultCode: 1, errorMsg: (err as Error).message };
    }
  }
  /**
   * @description 添加标签
   */
  public async add() {
    const { ctx } = this;
    console.log(ctx.request.body);
    try {
      const result = await ctx.service.tag.addItem(ctx.request.body);
      ctx.body = { resultCode: 0, errorMsg: null, data: result };
    } catch (err) {
      ctx.body = { resultCode: 1, errorMsg: (err as Error).message };
    }
  }
  /**
   * @description 更新标签信息
   */
  public async update() {
    const { ctx } = this;
    const { id, ...responseBody } = ctx.request.body;
    try {
      const result = await ctx.service.tag.updateItem(id, responseBody);
      ctx.body = { resultCode: 0, errorMsg: null, data: result };
    } catch (err) {
      ctx.body = { resultCode: 1, errorMsg: (err as Error).message };
    }
  }
  /**
   * @description 删除标签
   */
  public async delete() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      const result = await ctx.service.tag.deleteItem(id);
      ctx.body = { resultCode: 0, errorMsg: null, data: result };
    } catch (err) {
      ctx.body = { resultCode: 1, errorMsg: (err as Error).message };
    }
  }
}
