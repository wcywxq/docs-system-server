import * as path from 'path';
import * as fs from 'fs';
import { Service } from 'egg';
import * as qiniu from 'qiniu';
import * as md5 from 'md5';

const ACCESS_KEY = '2XMp_9K80IY2kb-ESCTg3eJ9QeDLrF5F9-Sv8QTK';
const SECTET_KEY = '0O892yUWehZUiuG2DTGb0avcaB-CSZrk0uE_sLlP';
const BUCKET = 'zm-images'; // 要上传的空间名
// 鉴权对象 mac
const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECTET_KEY);
// 上传凭证
const options = {
  scope: BUCKET,
};
const putPolicy = new qiniu.rs.PutPolicy(options);
// 上传文件 token
const uploadToken = putPolicy.uploadToken(mac);
const config: any = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0; // Zone_z0 -> 华东

type UploadFileData = {
  name: string;
  data: string;
};

export default class UtilService extends Service {
  public async uploadFiles({ name, data }: UploadFileData) {
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
              url: `http://zm-images.conjuring.cn/${respBody.key}`,
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
