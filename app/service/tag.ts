import { Service } from 'egg';
import { CreateTagDto, QueryTagDto, UpdateTagDto } from '../dto/tag.dto';
import { FilterQuery } from 'mongoose';

type QueryParams = FilterQuery<QueryTagDto & {
  createTime: Date;
}>;

/**
 * Test Service
 */
export default class TagService extends Service {
  /**
   * @description 获取全部标签
   */
  public async getList(params: QueryTagDto) {
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
        $lt: params.createEndTime,
      };
    }
    return ctx.model.Tag.find(queryParams);
  }
  /**
   * @description 获取标签
   */
  public async getItem(id: string) {
    const { ctx } = this;
    return ctx.model.Tag.findById(id);
  }
  /**
   * @description 添加标签
   */
  public async addItem(responseBody: CreateTagDto) {
    const { ctx } = this;
    return ctx.model.Tag.create(responseBody);
  }
  /**
   * @description 更新标签信息
   */
  public async updateItem(id: string, responseBody: UpdateTagDto) {
    const { ctx } = this;
    return ctx.model.Tag.findByIdAndUpdate(id, responseBody);
  }
  /**
   * @description 删除标签
   */
  public async deleteItem(id: string) {
    const { ctx } = this;
    return ctx.model.Tag.findByIdAndRemove(id);
  }
}
