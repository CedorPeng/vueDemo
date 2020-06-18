import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '../components/Home'
import inputValidate from '../components/inputValidate'
import transition1 from '../components/transition1'
import station from '../components/station'
import chart from '../components/chart'

Vue.use(Router)
const router = new Router({
  routes: [
    {name: 'home', path: '/', redirect: '/station'},
    {
      path: '/HelloWorld',
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
    },
    {
      path: '/transition1',
      name: 'transition1',
      component: transition1
    },
    {
      path: '/station',
      name: 'station',
      component: station
    },
    {
      path: '/chart',
      name: 'chart',
      component: chart
    },
  ]
})

router.beforeEach((to, from, next) => {
  let path;
  if (to.path.split('/').length > 2) {
    path = '/' + to.path.split('/')[1]
  } else {
    path = to.path
  }
  next()
})
export default router
