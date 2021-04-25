import { Service } from 'egg';
import { CreateArticleDto, QueryArticleDto, UpdateArticleDto, UpdateArticlePublishDto } from '../dto/article.dto';
import { FilterQuery } from 'mongoose';

type QueryParams = FilterQuery<QueryArticleDto & {
  createTime: Date
}>;

/**
 * Test Service
 */
export default class ArticleService extends Service {
  /**
   * @description 获取全部文章
   */
  public async getList(params: QueryArticleDto) {
    const { ctx } = this;
    // 组合查询条件
    const queryParams: QueryParams = {};
    if (params.title !== undefined) {
      queryParams.title = {
        $regex: new RegExp(params.title, 'g'),
      };
    }
    if (params.author !== undefined) {
      queryParams.author = params.author;
    }
    if (params.tags !== undefined) {
      queryParams.tags = {
        $in: params.tags.split(','),
      };
    }
    if (params.category !== undefined) {
      queryParams.category = params.category;
    }
    if (params.isPublish !== undefined) {
      queryParams.isPublish = params.isPublish;
    }
    if (params.source !== undefined) {
      queryParams.source = params.source;
    }
    if (params.createBeginTime !== undefined && params.createEndTime !== undefined) {
      queryParams.createTime = {
        $gt: params.createBeginTime,
        $lt: params.createEndTime,
      };
    }
    return ctx.model.Article.find(queryParams)
      .populate('category')
      .populate('tags');
  }
  /**
   * @description 获取文章
   */
  public async getItem(id: string) {
    const { ctx } = this;
    return ctx.model.Article.findById(id);
  }
  /**
   * @description 添加文章
   */
  public async addItem(responseBody: CreateArticleDto) {
    const { ctx } = this;
    responseBody.author = 'magic';
    return ctx.model.Article.create(responseBody);
  }
  /**
   * @description 更新文章信息
   */
  public async updateItem(id: string, responseBody: UpdateArticleDto) {
    const { ctx } = this;
    return ctx.model.Tag.findByIdAndUpdate(id, responseBody);
  }
  /**
   * @description 删除文章
   */
  public async deleteItem(id: string) {
    const { ctx } = this;
    return ctx.model.Article.findByIdAndRemove(id);
  }
  /**
   * @description 更新发布状态
   */
  public async updateStatus(id: string, responseBody: UpdateArticlePublishDto) {
    const { ctx } = this;
    return ctx.model.Article.findByIdAndUpdate(id, responseBody);
  }
}
