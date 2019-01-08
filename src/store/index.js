import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import changeValue from './module/changeValue'


export default new Vuex.Store({
  modules:{
    changeValue
  }
})




