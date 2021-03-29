import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  router.post('/user/login', controller.user.login);
  router.get('/user/register', controller.user.index);
  // router.get('/user/logout', controller.user.index);

  router.get('/user/list', controller.user.index);
  router.get('/user/:id', controller.user.item);
  router.post('/user/add', controller.user.add);
  router.post('/user/update', controller.user.update);
  router.post('/user/delete', controller.user.delete);
};
