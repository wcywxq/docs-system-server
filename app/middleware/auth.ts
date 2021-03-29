import { Context, EggAppConfig } from 'egg';

export default function authMiddleware(options: EggAppConfig) {
  return async (ctx: Context, next: () => Promise<any>) => {
    console.log(options);
    if (ctx.session.openId) {
      await next();
    } else {
      ctx.body = {
        resultCode: -1,
        errorMsg: '未登录',
      };
    }
  };
}
