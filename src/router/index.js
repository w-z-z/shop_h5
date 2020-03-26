/*
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2020-03-02 09:22:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-11 16:00:59
 */
import Vue from 'vue'
import Router from 'vue-router'
import routers from './allRouter'
import store from '../store'
Vue.use(Router)
//使用Vue.mixin的方法拦截了路由离开事件，并在该拦截方法中实现了销毁页面缓存的功能。
// Vue.mixin({
//   beforeRouteLeave: function (to, from, next) {
//     //此处判断是如果返回上一层，你可以根据自己的业务更改此处的判断逻辑，酌情决定是否摧毁本层缓存。
//     if (
//       from &&
//       from.meta.rank &&
//       to.meta.rank &&
//       from.meta.rank >= to.meta.rank
//     ) {
//       if (this.$vnode && this.$vnode.data.keepAlive) {
//         if (
//           this.$vnode.parent &&
//           this.$vnode.parent.componentInstance &&
//           this.$vnode.parent.componentInstance.cache
//         ) {
//           if (this.$vnode.componentOptions) {
//             var key =
//               this.$vnode.key === null
//                 ? this.$vnode.componentOptions.Ctor.cid +
//                 (this.$vnode.componentOptions.tag
//                   ? `::${this.$vnode.componentOptions.tag}`
//                   : '')
//                 : this.$vnode.key
//             var cache = this.$vnode.parent.componentInstance.cache
//             var keys = this.$vnode.parent.componentInstance.keys
//             if (cache[key]) {
//               if (keys.length) {
//                 var index = keys.indexOf(key)
//                 if (index > -1) {
//                   keys.splice(index, 1)
//                 }
//               }
//               delete cache[key]
//             }
//           }
//         }
//       }
//       this.$destroy()
//     }
//     next()
//   }
// })



Vue.mixin({
  beforeRouteLeave: function (to, from, next) {
    let token = store.state.user.userInfo && store.state.user.userInfo.token ? store.state.user.userInfo.token : ''
    //此处判断是如果返回上一层，你可以根据自己的业务更改此处的判断逻辑，酌情决定是否摧毁本层缓存。
    if (to.meta.needLogin && !token) {
      next('/login')
    } else {
      next()
    }
  }
})

export default new Router({
  // mode: 'history', //后端支持可开
  routes: routers,
})