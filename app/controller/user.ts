import { Controller } from 'egg';

export default class UserController extends Controller {
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
