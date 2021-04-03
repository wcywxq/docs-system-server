import * as path from 'path';
import * as fs from 'fs';
import { Service } from 'egg';
import * as qiniu from 'qiniu';
import * as md5 from 'md5';
import { UploadFileDto } from '../dto/util.dto';
import { ACCESS_KEY, SECTET_KEY, BUCKET, EXPRIES } from '../config';

export default class UtilService extends Service {
  /**
   * @description 上传文件
   */
  public async uploadFiles({ name, data }: UploadFileDto) {
    // 鉴权对象 mac
    const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECTET_KEY);
    // 上传凭证
    const options = {
      scope: BUCKET,
      expries: EXPRIES, // 上传凭证有效期
    };
    // 生成上传凭证
    const putPolicy = new qiniu.rs.PutPolicy(options);
    // 上传文件 token (每次调用时重新获取，避免过过期)
    const uploadToken = putPolicy.uploadToken(mac);
    // 服务端上传配置
    const config: any = new qiniu.conf.Config();
    config.zone = qiniu.zone.Zone_z0; // Zone_z0 -> 华东

    // 文件名
    const fileName = `${md5(name)}${path.extname(name)}`;
    // eslint-disable-next-line quotes
    const localFilePath = path.join(__dirname, "../public/uploads", fileName);
    // base64 过滤并转换为 buffer
    const base64Data = data.replace(/data:image\/\w+;base64,/g, '').replace(/data:text\/\w+;base64,/g, '');
    const dataBuffer = Buffer.from(base64Data, 'base64');

    return new Promise((resolve, reject) => {
      fs.writeFile(localFilePath, dataBuffer, (err: any) => {
        if (err) throw new Error(err);
        const localFile = localFilePath;
        const formUploader = new qiniu.form_up.FormUploader(config);
        const putExtra = new qiniu.form_up.PutExtra();
        const key = fileName;
        // 文件上传
        formUploader.putFile(uploadToken, key, localFile, putExtra, (respErr, respBody, respInfo) => {
          if (respErr) {
            reject(respErr.message);
          }
          if (respInfo.statusCode === 200) {
            resolve({
              url: `http://${BUCKET}.conjuring.cn/${respBody.key}`,
              name,
            });
          } else {
            reject(JSON.stringify(respBody));
          }
          // 上传之后删除本地文件
          fs.unlinkSync(localFilePath);
        });
      });
    });
  }
}
