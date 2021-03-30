import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  router.get('/review/list', controller.review.all);
  router.get('/review/:id', controller.review.item);
  router.post('/review/add', controller.review.add);
  router.post('/review/update', controller.review.update);
  router.post('/review/delete', controller.review.delete);
};
