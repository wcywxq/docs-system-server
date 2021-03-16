import { Controller } from 'egg';

export default class ArticleController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.article.getList('article');
  }

  public async item() {
    const { ctx } = this;
    ctx.body = await ctx.service.article.getItem();
  }

  public async add() {
    const { ctx } = this;
    ctx.body = await ctx.service.article.addItem();
  }

  public async update() {
    const { ctx } = this;
    ctx.body = await ctx.service.article.updateItem();
  }

  public async delete() {
    const { ctx } = this;
    ctx.body = await ctx.service.article.deleteItem();
  }
}
