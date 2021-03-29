import { Service } from 'egg';

/**
 * Test Service
 */
export default class UserService extends Service {
  public async login(requestBody: any) {
    const { ctx } = this;
    const { userName } = requestBody;
    const result = await ctx.model.User.findOne({ userName });
    return result;
  }

  public async register(requestBody: any) {
    const { ctx } = this;
    const { userName, password } = requestBody;
    const response = await ctx.model.User.create({ userName, password });
    return response;
  }

  public async getList(name: string) {
    return `hi, ${name}`;
  }

  public async getItem() {
    return 'get item';
  }

  public async addItem() {
    return 'add item';
  }

  public async updateItem() {
    return 'update item';
  }

  public async deleteItem() {
    return 'delete item';
  }
}
