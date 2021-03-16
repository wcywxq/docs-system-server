import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  router.get('/tag/list', controller.tag.index);
  router.get('/tag/:id', controller.tag.item);
  router.post('/tag/add', controller.tag.add);
  router.post('/tag/update', controller.tag.update);
  router.post('/tag/delete', controller.tag.delete);
};
