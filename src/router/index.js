import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '../components/Home'
import inputValidate from '../components/inputValidate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/home',
      name: 'home',
      component: Home 
    },
    {
      path: '/inputValidate',
      name: 'inputValidate',
      component: inputValidate
    }
  ]
})
