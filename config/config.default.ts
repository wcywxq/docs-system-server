import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1615878494433_5995';

  // add your egg config in here
  config.middleware = [];

  // 安全
  config.security = {
    csrf: {
      // headerName: 'x-csrf-token', // csrfToken 请求头
      enable: false, // 暂时关闭内置的安全系统
    },
  };

  // passport github 鉴权
  config.passportGithub = {
    key: 'a1c8a0362b7225962610', // client id,
    secret: 'aac1d9eb041184085d6328ff9de99870823d67e4', // client secret
    // callbackURL: '/passport/github/callback', // 默认为 /passport/${strategy}/callback
    // proxy: false
  };

  // 数据库
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/notice',
    options: {},
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
