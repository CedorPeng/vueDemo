import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '../components/Home'
import News from '../components/News'
import draggable from '../components/Draggable'
import inputValidate from '../components/inputValidate'
import transition1 from '../components/transition1'
import D3Line from '../childComponents/D3Line'

Vue.use(Router)
const router = new Router({
    routes: [
        {name: 'home', path: '/', redirect: '/home'},
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
            path: '/news',
            name: 'news',
            component: News
        },
        {
            path: '/draggable',
            name: 'draggable',
            component: draggable
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
