import { Service } from 'egg';

/**
 * Test Service
 */
export default class CategoryService extends Service {

  public async getList() {
    const { ctx } = this;
    const result = await ctx.model.Category.find();
    return result;
  }

  public async getItem(id: string) {
    const { ctx } = this;
    const result = await ctx.model.Category.findById(id);
    return result;
  }

  public async addItem() {
    const { ctx, app: { mongoose } } = this;
    const result = ctx.model.Category.create({
      category_id: mongoose.Types.ObjectId(),
      name: '前端',
    });
    return result;
  }

  public async updateItem() {
    return 'update item';
  }

  public async deleteItem(id: string) {
    const { ctx } = this;
    const result = await ctx.model.Category.findByIdAndRemove(id);
    return result;
  }
}
