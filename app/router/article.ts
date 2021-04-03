import { Application } from 'egg';
import { AuthMiddleWare } from './index';

export default (app: Application, auth: AuthMiddleWare) => {
  const { controller, router } = app;
  router.get('/article/list', auth, controller.article.all);
  router.get('/article/item', auth, controller.article.item);
  router.post('/article/add', auth, controller.article.add);
  router.post('/article/update', auth, controller.article.update);
  router.post('/article/delete', auth, controller.article.delete);
  router.post('/article/update_status', auth, controller.article.updateStatus);
};
