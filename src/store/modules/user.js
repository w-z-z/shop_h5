/*
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2020-03-03 16:55:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-11 09:34:04
 */
import Vue from 'vue'
import router from '../../router/index'
const state = {
  userInfo: {
    name: ''
  },
  editAddress: {}
}
const mutations = {
  SET_USER_INFO(state, data) {
    state.userInfo = data
  },
  INCREMENT_CHANGEUSERINFO(state, data) {
    state.userInfo = data
  },
  EDIT_ADDRESS(state, data) {
    state.editAddress = data
  }
}
const actions = {
  setUserInfo({
    commit
  }, data) {
    return new Promise((resolve) => {
      commit('SET_USER_INFO', data)
      resolve()
    })
  },

  editAddress({
    commit
  }, data) {
    commit('EDIT_ADDRESS', data)
  },
  //清空用户数据
  clearAllUserData({
    commit
  }, data = {}) {
    commit('INCREMENT_CHANGEUSERINFO', data)
    Vue.prototype.$showMsg('登录失效')
    //回到登录页
    router.push({
      name: 'login'
    })
  },
  //订单结算
  payOrder({
    commit
  }, data = '') {
    Vue.prototype.$api['SettlementReceipt']({
        receipt_id: data
      }).then(res => {
        window.location.href = res.pay_url
      })
      .catch(() => {
        Vue.prototype.$showMsg('操作失败')
      })
  }
}

export default {
  state,
  mutations,
  actions
}