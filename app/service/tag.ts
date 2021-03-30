import { Service } from 'egg';

/**
 * Test Service
 */
export default class TagService extends Service {
  /**
   * @description 获取全部标签
   */
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
  /**
   * @description 获取标签
   */
  public async getItem(id: string) {
    const { ctx } = this;
    const result = await ctx.model.Tag.findById(id);
    return result;
  }
  /**
   * @description 添加标签
   */
  public async addItem(responseBody: any) {
    const { ctx } = this;
    const result = ctx.model.Tag.create(responseBody);
    return result;
  }
  /**
   * @description 更新标签信息
   */
  public async updateItem() {
    return 'update item';
  }
  /**
   * @description 删除标签
   */
  public async deleteItem(id: string) {
    const { ctx } = this;
    const result = await ctx.model.Tag.findByIdAndRemove(id);
    return result;
  }
}
