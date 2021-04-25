import { Application } from 'egg';
import { AuthMiddleWare } from '../index';

export default (app: Application, auth: AuthMiddleWare) => {
  const { controller, router } = app;
  router.get('/review/list', auth, controller.review.all);
  router.get('/review/:id', auth, controller.review.item);
  router.post('/review/add', auth, controller.review.add);
  router.post('/review/update', auth, controller.review.update);
  router.post('/review/delete', auth, controller.review.delete);
};
