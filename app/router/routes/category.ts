import { Application } from 'egg';
import { AuthMiddleWare } from '../index';

export default (app: Application, auth: AuthMiddleWare) => {
  const { controller, router } = app;
  router.get('/category/list', auth, controller.category.all);
  router.get('/category/:id', auth, controller.category.item);
  router.post('/category/add', auth, controller.category.add);
  router.post('/category/update', auth, controller.category.update);
  router.post('/category/delete', auth, controller.category.delete);
};
