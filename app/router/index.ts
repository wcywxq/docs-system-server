import { Application } from 'egg';
import utilRouter from './util';
import articleRouter from './article';
import categoryRouter from './category';
import reviewRouter from './review';
import tagRouter from './tag';
import userRouter from './user';

export default (app: Application) => {
  // 挂载鉴权路由(第三方登陆)
  // app.passport.mount('github');

  // 上面是 mount 语法糖
  // const github = app.passport.authenticate('github', {});
  // router.get('/passport/github', github);
  // router.get('/passport/github/callback', github);

  utilRouter(app);
  articleRouter(app);
  categoryRouter(app);
  reviewRouter(app);
  tagRouter(app);
  userRouter(app);
};
