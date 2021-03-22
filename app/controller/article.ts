import { Controller } from 'egg';

export default class ArticleController extends Controller {
  public async index() {
    const { ctx } = this;
    try {
      const result = await ctx.service.article.getList(ctx.query);
      ctx.body = {
        resultCode: 0,
        errorMsg: null,
        data: result,
      };
    } catch (err) {
      ctx.body = {
        resultCode: 1,
        errorMsg: err,
      };
    }
  }

  public async item() {
    const { ctx } = this;
    try {
      const result = await ctx.service.article.getItem(ctx.query.id);
      ctx.body = {
        resultCode: 0,
        errorMsg: null,
        data: result,
      };
    } catch (err) {
      ctx.body = {
        resultCode: 1,
        errorMsg: err,
      };
    }
  }

  public async add() {
    const { ctx } = this;
    try {
      const result = await ctx.service.article.addItem(ctx.request.body);
      ctx.body = {
        resultCode: 0,
        errorMsg: null,
        data: result,
      };
    } catch (err) {
      ctx.body = {
        resultCode: 1,
        errorMsg: err,
      };
    }
  }

  public async update() {
    const { ctx } = this;
    ctx.body = await ctx.service.article.updateItem();
  }

  public async delete() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      const result = await ctx.service.article.deleteItem(id);
      ctx.body = {
        resultCode: 0,
        errorMsg: null,
        data: result,
      };
    } catch (err) {
      ctx.body = {
        resultCode: 1,
        errorMsg: err,
      };
    }
  }

  public async updateStatus() {
    const { ctx } = this;
    try {
      const result = await ctx.service.article.updateStatus(ctx.request.body);
      ctx.body = {
        resultCode: 0,
        errorMsg: null,
        data: result,
      };
    } catch (err) {
      ctx.body = {
        resultCode: 1,
        errorMsg: err,
      };
    }
  }
}
