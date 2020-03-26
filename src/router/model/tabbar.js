/*
 * @Description: 有tabar的页面
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2020-03-05 09:55:21
 * @LastEditors: ranli
 * @LastEditTime: 2020-03-05 09:59:16
 */
import tabbarLayout from '@/tabbarLayout'
let tabbar = [{
  name: 'tabbarLayout',
  meta: {
    title: 'tabbarLayout',
    // keepAlive: true,
  },
  path: '/tabbarLayout',
  redirect: '/product',
  component: tabbarLayout,
  children: [{
      name: 'product',
      meta: {
        title: '精准e生',
        // keepAlive: true,
        headerRight: {
          type: 'text',
          text: '登录',
          rightHandel() {
            // this vue对象
            this.$router.push('/login')
          }
        }
      },
      path: '/product',
      component: () => import('@/views/product/index.vue'),
    },
    {
      name: 'userCenter',
      meta: {
        title: '我的',
        needLogin: true
      },
      path: '/userCenter',
      component: () => import('@/views/userCenter/index.vue'),
    },
  ]
}, ]
export default tabbar