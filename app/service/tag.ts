import { Service } from 'egg';

/**
 * Test Service
 */
export default class TagService extends Service {
  public async getList(params: any) {
    const { ctx } = this;
    console.log(params);
    // 组合查询条件
    const mongoParams: any = {};
    params.name && (mongoParams.name = { $regex: new RegExp(params.name, 'g') });
    params.createBeginTime !== undefined && params.createEndTime !== undefined && (mongoParams.createTime = { $gt: params.createBeginTime, $lt: params.createEndTime });
    const result = await ctx.model.Tag.find(mongoParams);
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
