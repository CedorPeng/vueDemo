// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import App from './App'
import router from './router'
import store from './store'
import './assets/style/base.less'
import QuarterModel from './childComponents/QuarterModel'
import CedorUtils from './util/base'
import htmlToPdf from './util/HtmlToPDF'
Vue.use(htmlToPdf)

Vue.use(iView)
Vue.component('QuarterModel',QuarterModel)
Vue.prototype.eventBus = new Vue()
Vue.prototype.CedorUtils = CedorUtils
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
