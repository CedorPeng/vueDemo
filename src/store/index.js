import Vue from 'vue'
import Vuex from 'vuex'
/**
 * @页面刷新不丢失vuex传值的插件
 * @ npm install vuex-persistedstate
  */
import createPersistence from 'vuex-persistedstate'

Vue.use(Vuex)

import changeValue from './module/changeValue'


export default new Vuex.Store({
  modules:{
    changeValue
  },
  plugins:[createPersistence({
    storage:window.sessionStorage
  })]
})




