/*
 * @Description: Layout
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2020-03-05 09:56:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-13 14:01:36
 */
import Layout from '@/layout'
let normal = [{
  name: 'Layout',
  meta: {
    title: 'Layout',
    // keepAlive: true,
  },
  path: '/Layout',
  redirect: '/product',
  component: Layout,
  children: [{
      meta: {
        title: '登录',
        keepAlive: true,
      },
      name: 'login',
      path: '/login',
      component: () => import('@/views/login/index.vue'),
    }, {
      name: 'TermsService',
      meta: {
        title: '服务条款',
      },
      path: '/TermsService',
      component: () => import('@/views/agreement/index.vue'),
    },
    {
      name: 'PrivacyStatement',
      meta: {
        title: '隐私声明',
      },
      path: '/PrivacyStatement',
      component: () => import('@/views/agreement/index.vue'),
    },
    {
      name: 'productDetail',
      meta: {
        title: '产品详情',
      },
      path: '/productDetail/:id',
      component: () => import('@/views/product/page/productDetail.vue'),
    },
    {
      name: 'settlement',
      meta: {
        title: '结算订单',
        needLogin: true
      },
      path: '/settlement/:num/:id',
      component: () => import('@/views/settlement/index.vue'),
    },
    {
      name: 'orders',
      meta: {
        title: '我的订单',
        needLogin: true,
        keepAlive: true,
        backURL: 'userCenter'
      },
      path: '/orders',
      component: () => import('@/views/userCenter/page/orders/index.vue'),
    },
    {
      name: 'orderDetail',
      meta: {
        title: '订单详情',
        needLogin: true,
      },
      path: '/orderDetail/:id',
      component: () => import('@/views/userCenter/page/orders/page/orderDetail.vue'),
    },
    {
      name: 'userInfo',
      meta: {
        title: '个人信息',
        needLogin: true
      },
      path: '/userInfo',
      component: () => import('@/views/userCenter/page/userInfo/index.vue'),
    },
    {
      name: 'addressList',
      meta: {
        title: '地址簿',
        needLogin: true
      },
      path: '/addressList',
      component: () => import('@/views/userCenter/page/address/index'),
    },
    {
      name: 'addAddress',
      meta: {
        title: '新增收货地址',
        needLogin: true
      },
      path: '/addAddress',
      component: () => import('@/views/userCenter/page/address/page/addAddress'),
    },
    {
      name: 'editAddress',
      meta: {
        title: '编辑收货地址',
        needLogin: true,
        headerRight: {
          type: 'icon',
          rightHandel() {
            // this vue对象
            console.log('删除')
          }
        }
      },
      path: '/editAddress/:id',
      component: () => import('@/views/userCenter/page/address/page/addAddress'),
    },
  ]
}]
export default normal