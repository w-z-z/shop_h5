/*
 * @Author: your name
 * @Date: 2020-03-02 17:22:26
 * @LastEditTime: 2020-03-04 11:16:14
 * @LastEditors: ranli
 * @Description: In User Settings Edit
 * @FilePath: \online_consent_web\src\api\url\product.js
 */
export default [
  //查询产品列表
  {
    name: 'GetGoodsList',
    url: '/v1/shopp/GetGoodsList',
    methods: 'get'
  },
  //查询产品详情
  {
    name: 'GetGoodsDetail',
    url: '/v1/shopp/GetGoodsDetail',
    methods: 'get'
  },
]