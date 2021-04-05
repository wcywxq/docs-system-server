import { Service } from 'egg';
import { CreateCategoryDto, QueryCategoryDto, UpdateCategoryDto } from '../dto/category.dto';

/**
 * Test Service
 */
export default class CategoryService extends Service {
  /**
   * @description 获取全部分类
   */
  public async getList(params: QueryCategoryDto) {
    const { ctx } = this;
    console.log(params);
    // 组合查询条件
    const mongoParams: any = {};
    params.name !== undefined && (mongoParams.name = { $regex: new RegExp(params.name, 'g') });
    params.createBeginTime !== undefined && params.createEndTime !== undefined && (mongoParams.createTime = { $gt: params.createBeginTime, $lt: params.createEndTime });
    const result = await ctx.model.Category.find(mongoParams);
    return result;
  }
  /**
   * @description 获取分类
   */
  public async getItem(id: string) {
    const { ctx } = this;
    const result = await ctx.model.Category.findById(id);
    return result;
  }
  /**
   * @description 添加分类
   */
  public async addItem(responseBody: CreateCategoryDto) {
    const { ctx } = this;
    const result = ctx.model.Category.create(responseBody);
    return result;
  }
  /**
   * @description 更新分类信息
   */
  public async updateItem(id: string, responseBody: UpdateCategoryDto) {
    const { ctx } = this;
    const result = ctx.model.Tag.findByIdAndUpdate(id, responseBody);
    return result;
  }
  /**
   * @description 删除分类
   */
  public async deleteItem(id: string) {
    const { ctx } = this;
    const result = await ctx.model.Category.findByIdAndRemove(id);
    return result;
  }
}
