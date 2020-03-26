/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: ranli
 * @Date: 2020-02-19 14:47:16
 * @LastEditors: ranli
 * @LastEditTime: 2020-03-05 13:56:49
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'
import _ from 'lodash'
import common from './common'
import './directive'

import {
  Lazyload
} from 'vant'
import * as custom from './filters'
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})

Vue.config.productionTip = false
Vue.use(api)
Vue.use(common)
Vue.use(Lazyload, {
  lazyComponent: true
})
Vue.prototype._ = _
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')