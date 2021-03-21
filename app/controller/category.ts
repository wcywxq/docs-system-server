import { Controller } from 'egg';

export default class CategoryController extends Controller {
  public async index() {
    const { ctx } = this;
    try {
      const result = await ctx.service.category.getList(ctx.query);
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
      const result = await ctx.service.category.getItem(ctx.params.id);
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
    console.log(ctx.request.body);
    try {
      const result = await ctx.service.category.addItem(ctx.request.body);
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
    ctx.body = await ctx.service.category.updateItem();
  }

  public async delete() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      const result = await ctx.service.category.deleteItem(id);
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
