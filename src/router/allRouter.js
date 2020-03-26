/*
 * @Description: 所有的路由配置
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-20 21:25:48
 * @LastEditors: ranli
 * @LastEditTime: 2020-03-05 17:35:44
 */

//错误页面
// import { notFound } from './routers/errorPage'
//所有路由信息
import tabbar from './model/tabbar'
import normal from './model/normal'
// import active from './model/active'
let RouterMap = [
  ...tabbar,
  ...normal,
]
//拼接路由
RouterMap.push({
  name: '',
  path: '*',
  redirect: '/product'
})
export default RouterMap