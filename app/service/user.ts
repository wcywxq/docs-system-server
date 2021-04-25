import { Service } from 'egg';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto, QueryUserDto } from '../dto/user.dto';
import { TOKEN_EXPRIES, TOKEN_SECRET_KEY } from '../config';
import { FilterQuery } from 'mongoose';

type QueryParams = FilterQuery<QueryUserDto & {
  createTime: Date;
}>;

export default class UserService extends Service {
  /**
   * @description 用户登陆
   */
  public async login(requestBody: CreateUserDto) {
    const { ctx, app } = this;
    const { userName, password } = requestBody;
    const response = await ctx.model.User.findOne({ userName });
    return new Promise((resolve, reject) => {
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
  }
  /**
   * @description 用户注册
   */
  public async register(requestBody: CreateUserDto) {
    const { ctx } = this;
    const { userName, password } = requestBody;
    return new Promise((resolve, reject) => {
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
  }
  /**
   * @description 用户更新密码
   */
  public async updatePassWord(responseBody: any) {
    const { ctx } = this;
    const { userName, password } = responseBody;
    return ctx.model.User.updateOne({ userName }, { password });
  }
  /**
   * @description 获取全部用户
   */
  public async getList(params: QueryUserDto) {
    const { ctx } = this;
    // 组合查询条件
    const queryParams: QueryParams = {};
    if (params.userName !== undefined) {
      queryParams.userName = {
        $regex: new RegExp(params.userName, 'g'),
      };
    }
    if (params.email !== undefined) {
      queryParams.email = {
        $regex: new RegExp(params.email, 'g'),
      };
    }
    if (params.phone !== undefined) {
      queryParams.phone = {
        $regex: new RegExp(params.phone, 'g'),
      };
    }
    if (params.isActive !== undefined) {
      // 类型转换
      queryParams.isActive = JSON.parse(params.isActive);
    }
    if (params.createBeginTime !== undefined && params.createEndTime !== undefined) {
      queryParams.createTime = {
        $gt: params.createBeginTime,
        $lt: params.createEndTime,
      };
    }
    return ctx.model.User.find(queryParams, { password: false });
  }
  /**
   * @description 删除用户
   */
  public async deleteItem(id: string) {
    const { ctx } = this;
    return ctx.model.User.findByIdAndRemove(id);
  }
}
