import { Application, Context } from 'egg';
import utilRouter from './util';
import articleRouter from './article';
import categoryRouter from './category';
import reviewRouter from './review';
import tagRouter from './tag';
import userRouter from './user';

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
  utilRouter(app, authMiddleware);
  articleRouter(app, authMiddleware);
  categoryRouter(app, authMiddleware);
  reviewRouter(app, authMiddleware);
  tagRouter(app, authMiddleware);
  userRouter(app, authMiddleware);
};
