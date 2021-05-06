import Vue from 'vue'
import VueRouter from 'vue-router'
// import main from "./main";
Vue.use(VueRouter)

const routes = [
    {
        // 会匹配所有路径
        path: '*',
        redirect:'/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "about" */ './pages/home.vue') // 官方默认的除了Home其他视图组件都这样导入，所以后续我们也是采取这样的方式。
    },
    {
        path: '/search/:val',
        name: 'search',
        component: () => import('./pages/search')
    },
    {
        path: '/goods/:id',
        name: 'goods',
        component: () => import('./pages/goods.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./pages/login.vue')
    },
    {
        path: '/profile/:uid',
        name: 'profile',
        component: () => import('./pages/profile')
    },
    {
        path: '/chat',
        name: 'chat',
        component: () => import('./pages/chat')
    },
    {
        path: '/chatroom',
        name: 'chatroom',
        component: () => import('./pages/chatroom')
    },
    {
        path: '/publish',
        name: 'publish',
        component: () => import('./pages/publish')
    },
    {
        path: '/test',
        component: () => import('./pages/test')
    },
    {
        path:'/register',
        component:()=>import('./pages/register')
    }

];

// mode 说明了我们使用的是history模式，如果不设置mode，则会使用默认的hash模式。
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});
router.beforeEach((to, from, next) => {
    if (to.name === 'login') {
        return next()
    }
    if (!localStorage.getItem('token')) {
        next({path: '/login'})
    } else {
        next()
    }
})
export default router;
