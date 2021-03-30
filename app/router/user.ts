import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  router.post('/user/login', controller.user.login);
  router.post('/user/register', controller.user.register);
  router.get('/user/list', controller.user.all);
  router.post('/user/delete', controller.user.delete);
  // router.get('/user/logout', controller.user.index);

  router.get('/user/:id', controller.user.item);
  // router.post('/user/add', controller.user.add);
  // router.post('/user/update', controller.user.update);
};
