import { Controller } from 'egg';

export default class UtilController extends Controller {
  /**
   * @description 上传文件
   */
  public async uploadFiles() {
    const { ctx } = this;
    const { name, data } = ctx.request.body;
    try {
      const result = await ctx.service.util.uploadFiles({ name, data });
      ctx.body = { resultCode: 0, errorMsg: null, data: result };
    } catch (err) {
      ctx.body = { resultCode: 1, errorMsg: (err as Error).message };
    }
  }
}
