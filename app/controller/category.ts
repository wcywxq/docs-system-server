import { Controller } from 'egg';

export default class CategoryController extends Controller {
  public async index() {
    const { ctx } = this;
    try {
      const result = await ctx.service.category.getList();
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
    try {
      const result = await ctx.service.category.addItem();
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
    try {
      const result = await ctx.service.category.deleteItem(ctx.params.id);
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
