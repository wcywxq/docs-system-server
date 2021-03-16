import { Controller } from 'egg';

export default class TagController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.tag.getList('tag');
  }

  public async item() {
    const { ctx } = this;
    ctx.body = await ctx.service.tag.getItem();
  }

  public async add() {
    const { ctx } = this;
    ctx.body = await ctx.service.tag.addItem();
  }

  public async update() {
    const { ctx } = this;
    ctx.body = await ctx.service.tag.updateItem();
  }

  public async delete() {
    const { ctx } = this;
    ctx.body = await ctx.service.tag.deleteItem();
  }
}
