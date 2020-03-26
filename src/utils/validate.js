/*
 * @Description: 表单验证方法
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-20 21:25:48
 * @LastEditors: ranli
 * @LastEditTime: 2020-02-26 10:46:01
 */
/**
 * 表单验证
 */

class Validate {
  constructor() {
    // 正则表达式
    this._regular = {
      // 手机号
      mobile: /^[1][3,4,5,7,8,9][0-9]{9}$/,
      // 验证邮箱
      email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
      // 身份证
      idcard: /^\d{6}(19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/,
      // 整数或者小数
      isdecimal: /^[0-9]*([.]{1}[0-9]*){0,1}$/,
      // 数字和字母
      alphanumeric: /^[A-Za-z0-9]+$/,
      // 纯字母
      letter: /^[A-Za-z]+$/,
      // 小写字母
      lowercaseletters: /^[a-z]+$/,
      // 字母或者特殊符号
      format1: /^[A-Za-z,.!@$%^&*_+=;:、?./]+$/,
      // 中文，字母或特殊符号
      format2: /^[\u4e00-\u9fa5A-Za-z0-9,.!@$%^&*_+=;:、?./]+$/,
      // 字母，数字或特殊符号
      format3: /^[A-Za-z0-9,.!@$%^&*_+=;:、?./]+$/,
      // 不少于6位
      password: /^[0-9A-Za-z]{6,}$/,
      //中文名字
      chinsesName: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/,
    }
  }
  /**
   * 验证手机号
   */
  verifyPhone = (value) => {
    // console.log(rule)
    if (value && this._regular.mobile.test(value)) {
      return true
    } else {
      return false
    }
  }

  /**
   * 验证邮箱
   */
  verifyEmail = (value) => {
    if (value && this._regular.email.test(value)) {
      return true
    } else {
      return false
    }
  }

  /**
   * 验证身份证
   */
  verifyIdcard = (value) => {
    if (value && this._regular.idcard.test(value)) {
      return true
    } else {
      return false
    }
  }

  /**
   * 验证整数或者小数
   */
  verifyIsdecimal = (value) => {
    if (value && this._regular.isdecimal.test(value)) {
      return true
    } else {
      return false
    }
  }

  /**
   * 验证数字和字母
   */
  verifyAlphanumeric = (value) => {
    if (value && this._regular.alphanumeric.test(value)) {
      return true
    } else {
      return false
    }
  }

  /**
   * 验证纯字母
   */
  verifyLetter = (value) => {
    if (value && this._regular.letter.test(value)) {
      return true
    } else {
      return false
    }
  }
  /**
   * 验证中文名
   */
  verifyChinsesName = (value) => {
    if (value && this._regular.chinsesName.test(value)) {
      return true
    } else {
      return false
    }
  }

  /**
   * 验证小写字母
   */
  verifyLowercaseletters = (value) => {
    if (value && this._regular.lowercaseletters.test(value)) {
      return true
    } else {
      return false
    }
  }

  /**
   * 验证字母或者特殊符号
   */
  verifyFormat1 = (value) => {
    if (value && this._regular.format1.test(value)) {
      return true
    } else {
      return false
    }
  }

  /**
   * 验证中文，字母或特殊符号
   */
  verifyFormat2 = (value) => {
    if (value && this._regular.format2.test(value)) {
      return true
    } else {
      return false
    }
  }

  /**
   * 验证字母，数字或特殊符号
   */
  verifyFormat3 = (value) => {
    if (value && this._regular.format3.test(value)) {
      return true
    } else {
      return false
    }
  }
  //验证密码长度
  verifyPwd = (value) => {
    if (value && this._regular.password.test(value)) {
      return true
    } else {
      return false
    }
  }
}

/*
  使用方法

  import { validate } from '@/plugin/validate'
  rules:{
    username: [validate.verifyRequired('姓名不能为空！')],
    password: [validate.verifyRequired('密码不能为空！')],
    phone: [
      { validator: validate.verifyPhone, trigger: 'change' }
    ],
    email: [
      validate.verifyRequired('邮箱不能为空！'),
      { validator: validate.verifyEmail, trigger: 'change' }
    ]
  }
   
*/


let validate = new Validate()

export {
  validate
}