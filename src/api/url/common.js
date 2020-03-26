/*
 * @Description: 公共接口
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-23 18:29:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-04 16:48:14
 */
export default [
  //查询当前时间
  {
    name: 'GetNowTime',
    url: '/v1/util/GetNowTime',
    methods: 'get'
  },
  // 服务条款
  {
    name: 'TermsService',
    url: '/v1/website/TermsService',
    methods: 'get'
  },
  // 隐私申明
  {
    name: 'PrivacyStatement',
    url: '/v1/website/PrivacyStatement',
    methods: 'get'
  }
]