/*
 * @Description:
 * @Author: knight
 * @Date: 2019-09-19 14:06:47
 * @LastEditors: ranli
 * @LastEditTime: 2020-03-04 16:28:50
 */
/*
 * @Description: 引入所有请求地址
 */

import common from './common'
import activity from './activity'
import product from './product'
import user from './user'
import settlement from './settlement'

export default [
  ...common, ...activity, ...product, ...user, ...settlement
]