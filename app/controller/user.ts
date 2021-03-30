import { Controller } from 'egg';

export default class UserController extends Controller {
  /**
   * @description 登陆
   */
  public async login() {
    const { ctx } = this;
    try {
      const result = await ctx.service.user.login(ctx.request.body);
      ctx.body = { resultCode: 0, errorMsg: null, data: result };
    } catch (err) {
      ctx.body = { resultCode: 1, errorMsg: err.message };
    }
  }
  /**
   * @description 注册
   */
  public async register() {
    const { ctx } = this;
    try {
      const result = await ctx.service.user.register(ctx.request.body);
      ctx.body = { resultCode: 0, errorMsg: null, data: result };
    } catch (err) {
      ctx.body = { resultCode: 1, errorMsg: err.message };
    }
  }
  /**
   * @description 修改密码
   */
  public async updatePassword() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.updatePassWord(ctx.request.body);
  }
  /**
   * @description 获取全部用户
   */
  public async all() {
    const { ctx } = this;
    try {
      const result = await ctx.service.user.getList(ctx.query);
      ctx.body = { resultCode: 0, errorMsg: null, data: result };
    } catch (err) {
      ctx.body = { resultCode: 1, errorMsg: (err as Error).message };
    }
  }
  /**
   * @description 获取用户
   */
  public async item() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.getItem();
  }
  /**
   * @description 删除用户
   */
  public async delete() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      const result = await ctx.service.user.deleteItem(id);
      ctx.body = { resultCode: 0, errorMsg: null, data: result };
    } catch (err) {
      ctx.body = { resultCode: 1, errorMsg: (err as Error).message };
    }
  }
}
