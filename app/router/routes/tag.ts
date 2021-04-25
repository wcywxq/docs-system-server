import { Application } from 'egg';
import { AuthMiddleWare } from '../index';

export default (app: Application, auth: AuthMiddleWare) => {
  const { controller, router } = app;
  router.get('/tag/list', auth, controller.tag.all);
  router.get('/tag/:id', auth, controller.tag.item);
  router.post('/tag/add', auth, controller.tag.add);
  router.post('/tag/update', auth, controller.tag.update);
  router.post('/tag/delete', auth, controller.tag.delete);
};
