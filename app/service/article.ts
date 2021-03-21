import { Service } from 'egg';
/**
 * Test Service
 */
export default class ArticleService extends Service {

  public async getList() {
    const { ctx } = this;
    const result = await ctx.model.Article.find().populate('category').populate('tags');
    // console.log(result);
    return result;
  }

  public async getItem(id: string) {
    const { ctx } = this;
    const result = await ctx.model.Article.findById(id);
    return result;
  }

  public async addItem(responseBody: any) {
    const { ctx } = this;
    const result = ctx.model.Article.create({
      author: 'magic',
      ...responseBody,
    });
    return result;
  }

  public async updateItem() {
    return 'update item';
  }

  public async deleteItem(id: string) {
    const { ctx } = this;
    const result = await ctx.model.Article.findByIdAndRemove(id);
    return result;
  }
}
