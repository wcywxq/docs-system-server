import { Controller } from 'egg';

export default class CategoryController extends Controller {
  /**
   * @description 获取全部分类
   */
  public async all() {
    const { ctx } = this;
    try {
      const result = await ctx.service.category.getList(ctx.query);
      ctx.body = { resultCode: 0, errorMsg: null, data: result };
    } catch (err) {
      ctx.body = { resultCode: 1, errorMsg: (err as Error).message };
    }
  }
  /**
   * @description 获取分类
   */
  public async item() {
    const { ctx } = this;
    try {
      const result = await ctx.service.category.getItem(ctx.params.id);
      ctx.body = { resultCode: 0, errorMsg: null, data: result };
    } catch (err) {
      ctx.body = { resultCode: 1, errorMsg: (err as Error).message };
    }
  }
  /**
   * @description 添加分类
   */
  public async add() {
    const { ctx } = this;
    console.log(ctx.request.body);
    try {
      const result = await ctx.service.category.addItem(ctx.request.body);
      ctx.body = { resultCode: 0, errorMsg: null, data: result };
    } catch (err) {
      ctx.body = { resultCode: 1, errorMsg: (err as Error).message };
    }
  }
  /**
   * @description 更新分类信息
   */
  public async update() {
    const { ctx } = this;
    ctx.body = await ctx.service.category.updateItem();
  }
  /**
   * @description 删除分类
   */
  public async delete() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      const result = await ctx.service.category.deleteItem(id);
      ctx.body = { resultCode: 0, errorMsg: null, data: result };
    } catch (err) {
      ctx.body = { resultCode: 1, errorMsg: (err as Error).message };
    }
  }
}
