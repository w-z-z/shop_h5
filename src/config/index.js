/*
 * @Author: ranli
 * @Date: 2019-09-11 17:49:40
 * @LastEditors: ranli
 * @LastEditTime: 2020-03-03 17:35:35
 * @Description: Description
 */
/**
 * 全局配置
 *
 */

// 基础信息配置
export const appConfig = {
  // 版本号
  version: '1.0.0',
  // 缓存配置(window.sessionStorage或者window.localStorage)
  storage: window.localStorage,
  // 超时设置
  TIMEOUT: 10000,
  UnLoginCode: 'AuthorizationServerError',
}