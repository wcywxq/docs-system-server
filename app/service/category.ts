import { Service } from 'egg';
import { CreateCategoryDto, QueryCategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import { FilterQuery } from 'mongoose';

type QueryParams = FilterQuery<QueryCategoryDto & {
  createTime: Date;
}>;

/**
 * Test Service
 */
export default class CategoryService extends Service {
  /**
   * @description 获取全部分类
   */
  public async getList(params: QueryCategoryDto) {
    const { ctx } = this;
    // 组合查询条件
    const queryParams: QueryParams = {};
    if (params.name !== undefined) {
      queryParams.name = {
        $regex: new RegExp(params.name, 'g'),
      };
    }
    if (params.createBeginTime !== undefined && params.createEndTime !== undefined) {
      queryParams.createTime = {
        $gt: params.createBeginTime,
        $lt: params.createEndTime
      };
    }
    return ctx.model.Category.find(queryParams);
  }
  /**
   * @description 获取分类
   */
  public async getItem(id: string) {
    const { ctx } = this;
    return ctx.model.Category.findById(id);
  }
  /**
   * @description 添加分类
   */
  public async addItem(responseBody: CreateCategoryDto) {
    const { ctx } = this;
    return ctx.model.Category.create(responseBody);
  }
  /**
   * @description 更新分类信息
   */
  public async updateItem(id: string, responseBody: UpdateCategoryDto) {
    const { ctx } = this;
    return ctx.model.Tag.findByIdAndUpdate(id, responseBody);
  }
  /**
   * @description 删除分类
   */
  public async deleteItem(id: string) {
    const { ctx } = this;
    return ctx.model.Category.findByIdAndRemove(id);
  }
}
