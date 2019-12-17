/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const whiteList = require('./white.list')
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1576480058164_2905';

  // add your middleware config here
  config.middleware = ['authority','consoleMiddleware'];

  config.security = {
      csrf: {
         enable:false
      }
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    mysql:{
      client:{
        port:'3306',
        user:'root',
        password:'root',
        database:'1706b',
        host:'localhost'
      }
    }
  };

  return {
    ...config,
    ...userConfig,
    whiteList
  };
};
