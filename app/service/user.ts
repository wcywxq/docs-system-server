import { Service } from 'egg';
import * as bcrypt from 'bcrypt';

export default class UserService extends Service {
  /**
   * @description 用户登陆
   */
  public async login(requestBody: any) {
    const { ctx } = this;
    const { username, password } = requestBody;
    const response = await ctx.model.User.findOne({ username });
    const result = new Promise((resolve, reject) => {
      if (response) {
        bcrypt.compare(password, response.password, (err, same) => {
          if (err) {
            reject(err);
          } else if (same) {
            resolve({ uid: response._id, username: response.username });
          } else {
            reject(new Error('密码错误'));
          }
        });
      } else {
        reject(new Error('账户不存在'));
      }
    });
    return result;
  }
  /**
   * @description 用户注册
   */
  public async register(requestBody: any) {
    const { ctx } = this;
    const { username, password } = requestBody;
    const response = new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          reject(err);
        }
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) {
            reject(err);
          }
          const findUser = await ctx.model.User.findOne({ username });
          if (findUser) {
            reject(new Error('当前用户已经被注册'));
          } else {
            const result = await ctx.model.User.create({ username, password: hash });
            if (result) {
              resolve('注册成功');
            } else {
              reject(new Error('注册失败'));
            }
          }
        });
      });
    });
    return response;
  }
  /**
   * @description 用户更新密码
   */
  public async updatePassWord(responseBody: any) {
    const { ctx } = this;
    const { username, password } = responseBody;
    const response = await ctx.model.User.updateOne({ username }, { password });
    return response;
  }
  /**
   * @description 获取全部用户
   */
  public async getList(params: any) {
    const { ctx } = this;
    console.log(params);
    // 组合查询条件
    const mongoParams: any = {};
    params.username !== undefined && (mongoParams.username = { $regex: new RegExp(params.username, 'g') });
    params.email !== undefined && (mongoParams.email = { $regex: new RegExp(params.email, 'g') });
    params.phone !== undefined && (mongoParams.phone = { $regex: new RegExp(params.phone, 'g') });
    params.isActive !== undefined && (mongoParams.isActive = JSON.parse(params.isActive)); // 类型转换
    params.createBeginTime !== undefined && params.createEndTime !== undefined && (mongoParams.createTime = { $gt: params.createBeginTime, $lt: params.createEndTime });
    const result = await ctx.model.User.find(mongoParams, { password: false });
    return result;
  }
  /**
   * @description 获取用户
   */
  public async getItem() {
    return 'get item';
  }
  /**
   * @description 更新用户信息
   */
  public async updateItem() {
    return 'update item';
  }
  /**
   * @description 删除用户
   */
  public async deleteItem(id: string) {
    const { ctx } = this;
    console.log(id);
    const result = await ctx.model.User.findByIdAndRemove(id);
    return result;
  }
}
