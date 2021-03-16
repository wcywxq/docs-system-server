import { Service } from 'egg';

/**
 * Test Service
 */
export default class ReviewService extends Service {

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
