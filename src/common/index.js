/*
 * @Description: 公共方法
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-23 15:53:12
 * @LastEditors: ranli
 * @LastEditTime: 2020-03-05 16:17:06
 */
// import { createRouter} from '@/router/index'

import {
  Toast
} from 'vant'
let _type = {
  1: 'text',
  2: 'loading ',
  3: 'success',
  4: 'html',
  5: 'fail',
}
class msgCalss {
  constructor({
    msg = '',
    type = 1,
    customClass = null,
    duration = 2000,
    icon = null,
    iconPrefix = null,
    transition = 'van-fade',
  } = {}) {
    // table组件显示的数据（类型 array）
    this.message = msg
    this.type = _type[type]
    this.className = customClass
    this.duration = duration
    this.icon = icon
    this.iconPrefix = iconPrefix
    this.transition = transition

  }
}
//消息方法
function showMsg(msg, type, duration, customClass, icon, iconPrefix, transition) {
  let obj = {
    msg,
    type,
    duration,
    customClass,
    icon,
    iconPrefix,
    transition,
  }
  Toast.clear()
  return Toast(new msgCalss({
    ...obj
  }))
}

/**
 * 获取格式化后的字符串
 * @param {*} fmt 格式样式(yyyy-MM-dd hh:mm:ss)
 * @return {*} 返回格式化后的时间字符串
 */
function getFormat(fmt = 'yyyy-MM-dd', time = new Date().getTime()) {
  let newTime = new Date(time)
  let o = {
    'M+': newTime.getMonth() + 1, // 月份
    'd+': newTime.getDate(), // 日
    'h+': newTime.getHours(), // 小时
    'm+': newTime.getMinutes(), // 分钟
    's+': newTime.getSeconds(), // 秒
    'q+': Math.floor((newTime.getMonth() + 3) / 3), // 季度
    'S': newTime.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (newTime.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
// //清除所有数据并退出
// function clearAllUserData() {
//   this.$store.dispatch('changeUserInfo', {})
//   // this.$router.hasAddRouter = false;
//   // this.$router.matcher = createRouter().matcher;
//   this.$router.replace({
//     name: 'login'
//   })
// }


/*
  获取年龄
 */
function getAge(birthday) {
  if (birthday) {
    var birthDayTime = new Date(birthday).getTime()
    var nowTime = new Date().getTime()
    return Math.ceil((nowTime - birthDayTime) / 31536000000)

  } else {
    return '--'
  }

}
//去除收尾空白
String.prototype.trim = function () {
  return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '')
};
//  判断是否为数组
Array.prototype.isArray = function (source) {
  return '[object Array]' === Object.prototype.toString.call(source)
}


export default {
  install(Vue) {
    Vue.prototype.$showMsg = showMsg
    Vue.prototype.$formatTime = getFormat
    Vue.prototype.$getAge = getAge
  },
  getFormat
}