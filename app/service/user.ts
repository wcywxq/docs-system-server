import { Service } from 'egg';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto, QueryUserDto } from '../dto/user.dto';
import { TOKEN_SECRET_KEY, TOKEN_EXPRIES } from '../config/index';
export default class UserService extends Service {
  /**
   * @description 用户登陆
   */
  public async login(requestBody: CreateUserDto) {
    const { ctx, app } = this;
    const { userName, password } = requestBody;
    const response = await ctx.model.User.findOne({ userName });
    const result = new Promise((resolve, reject) => {
      if (response) {
        bcrypt.compare(password, response.password, (err, same) => {
          if (err) {
            reject(err);
          } else if (same) {
            // 登陆成功
            const token = jwt.sign(
              {
                data: {
                  userId: response._id,
                },
              },
              TOKEN_SECRET_KEY,
              { expiresIn: TOKEN_EXPRIES },
            );
            app.redis.set(response._id, token);
            resolve({ userId: response._id, userName: response.userName, token });
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
  public async register(requestBody: CreateUserDto) {
    const { ctx } = this;
    const { userName, password } = requestBody;
    const response = new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          reject(err);
        }
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) {
            reject(err);
          }
          const findUser = await ctx.model.User.findOne({ userName });
          if (findUser) {
            reject(new Error('当前用户已经被注册'));
          } else {
            const result = await ctx.model.User.create({ userName, password: hash });
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
    const { userName, password } = responseBody;
    const response = await ctx.model.User.updateOne({ userName }, { password });
    return response;
  }
  /**
   * @description 获取全部用户
   */
  public async getList(params: QueryUserDto) {
    const { ctx } = this;
    console.log(params);
    // 组合查询条件
    const mongoParams: any = {};
    params.userName !== undefined && (mongoParams.userName = { $regex: new RegExp(params.userName, 'g') });
    params.email !== undefined && (mongoParams.email = { $regex: new RegExp(params.email, 'g') });
    params.phone !== undefined && (mongoParams.phone = { $regex: new RegExp(params.phone, 'g') });
    params.isActive !== undefined && (mongoParams.isActive = JSON.parse(params.isActive)); // 类型转换
    params.createBeginTime !== undefined && params.createEndTime !== undefined && (mongoParams.createTime = { $gt: params.createBeginTime, $lt: params.createEndTime });
    const result = await ctx.model.User.find(mongoParams, { password: false });
    return result;
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
