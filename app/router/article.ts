import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  router.get('/article/list', controller.article.index);
  router.get('/article/:id', controller.article.item);
  router.post('/article/add', controller.article.add);
  router.post('/article/update', controller.article.update);
  router.post('/article/delete', controller.article.delete);
};