/*
 * @Author: your name
 * @Date: 2020-03-03 14:47:46
 * @LastEditTime: 2020-03-05 16:25:26
 * @LastEditors: ranli
 * @Description: In User Settings Edit
 * @FilePath: \online_consent_web\src\api\url\user.js
 */

export default [
  //个人用户注册&&登录
  {
    name: 'PersonOpenAccount',
    url: '/v1/login/PersonOpenAccount',
  },
  //发送验证码
  {
    name: 'SendLoginCode',
    url: '/v1/login/SendLoginCode',
  },
  //查询收货地址
  {
    name: 'GetReceiveAddress',
    url: '/v1/receive_address/GetReceiveAddress',
    methods: 'get'
  },
  //查询默认收货地址
  {
    name: 'GetDefaultReceiveAddress',
    url: '/v1/receive_address/GetDefaultReceiveAddress',
    methods: 'get'
  },
  //新增收货地址
  {
    name: 'CreateReceiveAddress',
    url: '/v1/receive_address/CreateReceiveAddress',
  },

  // 查询收货地址详情
  {
    name: 'GetReceiveAddressDetail',
    url: '/v1/receive_address/GetReceiveAddressDetail',
    methods: 'get'
  },
  //编辑收货地址
  {
    name: 'UpdateReceiveAddress',
    url: '/v1/receive_address/UpdateReceiveAddress',
  },
  //删除收货地址
  {
    name: 'DeleteReceiveAddress',
    url: '/v1/receive_address/DeleteReceiveAddress',
  },
  //设置默认收货地址
  {
    name: 'SetDefaultReceiveAddress',
    url: '/v1/receive_address/SetDefaultReceiveAddress',
  },
  // 上传头像
  {
    name: 'UploadHeadImg',
    url: '/v1/person/UploadHeadImg',
  },
  // 个人用户上传图片
  {
    name: 'UploadImg',
    url: '/v1/upload/UploadImg',
  },
  // 个人用户获取七牛云上传凭证
  {
    name: 'GetQiNiuUploadToken',
    url: '/v1/upload/GetQiNiuUploadToken',
  },
  // 修改昵称
  {
    name: 'ModifyNickName',
    url: '/v1/person/ModifyNickName',
  },
  //订单模块
  {
    name: 'GetReceiptList',
    url: '/v1/shopp/GetReceiptList',
    methods: 'get'
  },
  //订单详情
  {
    name: 'GetReceiptDetail',
    url: '/v1/shopp/GetReceiptDetail',
    methods: 'get'
  },
  //取消订单
  {
    name: 'CancelOrder',
    url: '/v1/shopp/CancelOrder'
  },
  //确认收货
  {
    name: 'ConfirmReceipt',
    url: '/v1/shopp/ConfirmReceipt',
  },
  //支付宝回调
  {
    name: 'AliPayNotify',
    url: '/v1/shopp/AliPayNotify'
  },
  // 结算
  {
    name: 'SettlementReceipt',
    url: '/v1/shopp/SettlementReceipt'
  },
  //统计用户的订单数量
  {
    name: 'GetReceiptCount',
    url: '/v1/shopp/GetReceiptCount',
    methods: 'get'
  }
]