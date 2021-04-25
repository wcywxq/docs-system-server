import { Application, Context } from 'egg';
import * as fs from 'fs';
import * as path from 'path';

export type AuthMiddleWare = (ctx: Context<any>, next: () => Promise<any>) => Promise<void>;

export default (app: Application) => {
  // 挂载鉴权路由(第三方登陆)
  // app.passport.mount('github');

  // 上面是 mount 语法糖
  // const github = app.passport.authenticate('github', {});
  // router.get('/passport/github', github);
  // router.get('/passport/github/callback', github);

  // 鉴权中间件
  const authMiddleware: AuthMiddleWare = app.middleware.auth(app);
  fs.readdir(path.resolve(__dirname, './routes'), (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      require(path.resolve(__dirname, './routes', file)).default(app, authMiddleware);
    });
  });
};
