import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '../components/Home'
import inputValidate from '../components/inputValidate'

Vue.use(Router)
const router = new Router({
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

router.beforeEach((to,from,next)=>{
  let path;
  if(to.path.split('/').length > 2){
    path = '/' + to.path.split('/')[1]
  }else{
    path = to.path
  }
  next()
})
export default router
