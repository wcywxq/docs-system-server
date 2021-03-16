import { Controller } from 'egg';

export default class ReviewController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.review.getList('review');
  }

  public async item() {
    const { ctx } = this;
    ctx.body = await ctx.service.review.getItem();
  }

  public async add() {
    const { ctx } = this;
    ctx.body = await ctx.service.review.addItem();
  }

  public async update() {
    const { ctx } = this;
    ctx.body = await ctx.service.review.updateItem();
  }

  public async delete() {
    const { ctx } = this;
    ctx.body = await ctx.service.review.deleteItem();
  }
}
