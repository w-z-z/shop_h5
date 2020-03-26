/*
 * @Author: your name
 * @Date: 2020-03-02 17:22:26
 * @LastEditTime: 2020-03-04 16:26:57
 * @LastEditors: ranli
 * @Description: In User Settings Edit
 * @FilePath: \online_consent_web\src\api\url\product.js
 */
export default [
  //下单
  {
    name: 'Pay',
    url: '/v1/shopp/Pay',
  },
  //查询用户购买此商品记录
  {
    name: 'GetPayGoodsNum',
    url: '/v1/shopp/GetPayGoodsNum',
    methods: 'get'
  }
]