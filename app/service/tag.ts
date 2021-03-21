import { Service } from 'egg';

/**
 * Test Service
 */
export default class TagService extends Service {
  public async getList() {
    const { ctx } = this;
    const result = await ctx.model.Tag.find();
    return result;
  }

  public async getItem(id: string) {
    const { ctx } = this;
    const result = await ctx.model.Tag.findById(id);
    return result;
  }

  public async addItem(responseBody: any) {
    const { ctx } = this;
    const result = ctx.model.Tag.create(responseBody);
    return result;
  }

  public async updateItem() {
    return 'update item';
  }

  public async deleteItem(id: string) {
    const { ctx } = this;
    console.log(id);
    const result = await ctx.model.Tag.findByIdAndRemove(id);
    return result;
  }
}
