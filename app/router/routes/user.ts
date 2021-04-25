import { Application } from 'egg';
import { AuthMiddleWare } from '../index';

export default (app: Application, auth: AuthMiddleWare) => {
  const { controller, router } = app;
  router.post('/user/login', controller.user.login);
  router.post('/user/register', controller.user.register);
  router.get('/user/list', auth, controller.user.all);
  router.post('/user/delete', auth, controller.user.delete);
  // router.get('/user/logout', controller.user.index);

  // router.get('/user/:id', auth, controller.user.item);
  // router.post('/user/add', controller.user.add);
  // router.post('/user/update', controller.user.update);
};
