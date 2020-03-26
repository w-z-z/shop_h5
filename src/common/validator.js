/*
 * @Descripttion:表单校验
 * @version: 1.0.0
 * @Author: ranli
 * @Date: 2020-02-20 12:39:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-11 14:29:53
 */
let rlues = {
  phone: /^[1]([3-9])[0-9]{9}$/,
  code: /\d{4}/,
}
//验证手机
export let phoneValidator = (val, name) => {
  return new Promise((resolve, reject) => {
    if (rlues.phone.test(val)) {
      resolve(true)
    } else {
      reject({
        name: name,
        status: false,
        msg: '手机号格式有误'
      })
    }
  })
}
//验证验证码
export let codeValidator = (val, name) => {
  return new Promise((resolve, reject) => {
    if (rlues.code.test(val)) {
      resolve(true)
    } else {
      reject({
        name: name,
        status: false,
        msg: '输入短信验证码'
      })
    }

  })
}