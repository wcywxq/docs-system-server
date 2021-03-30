import { Controller } from 'egg';

export default class UserController extends Controller {
  /**
   * @description 登陆
   */
  public async login() {
    const { ctx } = this;
    try {
      const result = await ctx.service.user.login(ctx.request.body);
      if (result) {
        ctx.body = { resultCode: 0, errorMsg: null, data: result };
      } else {
        throw new Error('账户不存在');
      }
    } catch (err) {
      ctx.body = { resultCode: 1, errorMsg: err.message };
    }
  }
  /**
   * @description 注册
   */
  public async register() {
    const { ctx } = this;
    const { username, password, confirmPassword } = ctx.request.body;
    try {
      if (password !== confirmPassword) {
        throw new Error('两次输入的密码不一致');
      } else {
        const result = await ctx.service.user.register({ username, password });
        if (result) {
          ctx.body = { resultCode: 0, errorMsg: null, data: '注册成功' };
        } else {
          throw new Error('注册失败');
        }
      }
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
    ctx.body = await ctx.service.user.getList('user');
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
    ctx.body = await ctx.service.user.deleteItem();
  }
}
