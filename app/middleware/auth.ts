import { Application, Context } from 'egg';
import * as jwt from 'jsonwebtoken';
import { TOKEN_SECRET_KEY } from '../config';

export default function auth(app: Application) {
  console.log(app);
  // token 解密，验证是否过期
  const verifyToken = (token: string) => {
    let result = {} as any;
    // token 解密
    jwt.verify(token, TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        throw err;
      } else {
        const current = Math.floor(Date.now() / 1000);
        const { data, exp } = decoded as any;
        console.log(current, exp);
        if (current <= exp) {
          result = data || {};
        }
      }
    });
    return result;
  };

  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      const token = ctx.request.headers.access_token;
      if (token) {
        const { userId } = verifyToken(token as string);
        // 验证客户端 token 是否合法
        if (userId) {
          const redis_token = await app.redis.get(userId);
          // 验证是否为最新的 token
          if (token === redis_token) {
            await next();
          } else {
            // 不是最新 token，伪造了 token
            throw new Error('已在其他机器登陆');
          }
        } else {
          // token 过期 or 不合法
          throw new Error('token过期');
        }
      } else {
        // 用户未登陆
        throw new Error('未登录');
      }
    } catch (err) {
      ctx.body = { resultCode: -1, errorMsg: err.message };
    }
  };
}
