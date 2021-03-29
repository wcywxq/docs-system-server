import { Controller } from 'egg';

export default class UserController extends Controller {
  public async login() {
    const { ctx } = this;
    try {
      const result = await ctx.service.user.login(ctx.request.body);
      if (result) {
        ctx.body = {
          resultCode: 0,
          errorMsg: null,
          data: result,
        };
      } else {
        ctx.body = {
          resultCode: 1,
          errorMsg: '账户不存在',
        };
      }
    } catch (err) {
      ctx.body = {
        resultCode: 1,
        errorMsg: err,
      };
    }
  }

  public async register() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.register(ctx.request.body);
  }

  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.getList('user');
  }

  public async item() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.getItem();
  }

  public async add() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.addItem();
  }

  public async update() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.updateItem();
  }

  public async delete() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.deleteItem();
  }
}
