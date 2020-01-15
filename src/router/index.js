import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '../components/Home'
import News from '../components/News'
import draggable from '../components/Draggable'
import inputValidate from '../components/inputValidate'
import D3 from '../components/D3'

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
            path: '/D3',
            name: 'D3',
            component: D3
        }
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
