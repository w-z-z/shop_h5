/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: ranli
 * @Date: 2020-02-19 14:47:16
 * @LastEditors: ranli
 * @LastEditTime: 2020-03-05 16:51:43
 */
const getters = {
  headerShow: state => state.app.headerShow,
  getToken: (state) => {
    return state.user.userInfo.token
  },
  getUserInfo: (state) => {
    return state.user.userInfo
  },
  getPersonInfo: (state) => {
    return state.user.userInfo.personInfo
  },
  // 获取地址
  getAddressDetail: (state) => {
    return state.user.editAddress
  }
}
export default getters