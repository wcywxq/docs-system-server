import { Application } from 'egg';
import { AuthMiddleWare } from './index';

export default (app: Application, auth: AuthMiddleWare) => {
  const { controller, router } = app;
  router.post('/upload', auth, controller.util.uploadFiles);
};
