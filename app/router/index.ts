import { Application } from 'egg';
import articleRouter from './article';
import categoryRouter from './category';
import reviewRouter from './review';
import tagRouter from './tag';
import userRouter from './user';

export default (app: Application) => {
  articleRouter(app);
  categoryRouter(app);
  reviewRouter(app);
  tagRouter(app);
  userRouter(app);
};
