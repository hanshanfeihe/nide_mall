/* eslint-disable space-before-function-paren */
/* eslint-disable space-in-parens */
/* eslint-disable func-call-spacing */
/* eslint-disable indent */
/* eslint-disable eol-last */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
import TopicList from '../views/TopicList.vue'
import TopicDetail from '../views/TopicDetail.vue'
import AllComments from '../views/AllComments.vue'
import Login from '../views/Login.vue'
import ListPage from '../views/ListPage.vue'
import Product from '../views/Product.vue'
import Cart from '../views/Cart.vue'
import Mine from '../views/Mine.vue'
import Collect from '../views/Collect.vue'
import Address from '../views/Address.vue'
import AddAddress from '../views/AddAddress.vue'
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(to) {
    return VueRouterReplace.call(this, to).catch(err => err)
}
Vue.use(VueRouter)
const routes = [{
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/topiclist/topicdetail',
        name: 'topicdetail',
        component: TopicDetail
    },
    // {
    //   path: '/topiclist/topicdetail/',
    //   name: 'relatedtopicdetail',
    //   component: TopicDetail
    // },
    {
        path: '/topiclist/topicdetai/allcomments',
        name: 'allcomments',
        component: AllComments
    },
    {
        path: '/category',
        name: 'Category',
        component: Category
    },
    {
        path: '/category/listpage',
        name: 'ListPage',
        component: ListPage
    },
    {
        path: '/product/:id',
        name: 'Product',
        component: Product,
        props: true
    },
    {
        path: '/topiclist',
        name: 'TopicList',
        component: TopicList
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/mine',
        name: 'Mine',
        component: Mine
    },
    {
        path: '/collect',
        name: 'Collect',
        component: Collect
    },
    {
        path: '/address',
        name: 'Address',
        component: Address
    },
    {
        path: '/address/addAddress',
        name: 'AddAddress',
        component: AddAddress
    }
]
const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    console.log(to.path)
    if (to.path === '/login') return next()
        // 从sessionStorage获取保存的token值
    const tokenStr = window.localStorage.getItem('token')
        // 没有token，强制跳转到登录页
    console.log(tokenStr)
    if (!tokenStr) return next('/login')
    next()
})
export default router