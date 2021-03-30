import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  router.get('/category/list', controller.category.all);
  router.get('/category/:id', controller.category.item);
  router.post('/category/add', controller.category.add);
  router.post('/category/update', controller.category.update);
  router.post('/category/delete', controller.category.delete);
};
