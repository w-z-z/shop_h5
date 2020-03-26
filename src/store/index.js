import Vue from 'vue'
import Vuex from 'vuex'

// 数据持久化插件
import VuexPersistence from 'vuex-persist'

import getters from './getters'
import modules from './modules'

Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
const store = new Vuex.Store({
  modules,
  getters,
  plugins: [vuexLocal.plugin],
  strict: process.env.NODE_ENV !== 'production'
})

export default store
