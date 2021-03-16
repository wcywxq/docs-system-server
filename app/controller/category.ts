import { Controller } from 'egg';

export default class CategoryController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.category.getList('category');
  }

  public async item() {
    const { ctx } = this;
    ctx.body = await ctx.service.category.getItem();
  }

  public async add() {
    const { ctx } = this;
    ctx.body = await ctx.service.category.addItem();
  }

  public async update() {
    const { ctx } = this;
    ctx.body = await ctx.service.category.updateItem();
  }

  public async delete() {
    const { ctx } = this;
    ctx.body = await ctx.service.category.deleteItem();
  }
}
