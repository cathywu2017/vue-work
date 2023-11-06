import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Login from '../components/Login'
import Admin from '../components/Admin'
import Products from '../components/pages/admin/Products.vue'
import Coupon from '../components/pages/admin/Coupon.vue'
import Order from '../components/pages/admin/Order.vue'

import Shop from '../components/Shop.vue'
import ShopList from '../components/pages/shop/ShopList.vue'
import ShopDetail from '../components/pages/shop/ShopDetail.vue'

import CartMain from '../components/CartMain.vue'
import Cart from '../components/pages/cart/Cart.vue'
import CartOrder from '../components/pages/cart/CartOrder.vue'
import CartCheck from '../components/pages/cart/CartCheck.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '*',
            redirect: '/'
        },
        {
            name: 'home',
            path: '/',
            component: Home,
        },
        {
            name: 'login',
            path: '/Login',
            component: Login
        },
        {
            name: 'admin',
            path: '/Admin',
            component: Admin,
            children:[
                {
                    name: 'products',
                    path: '/',
                    component: Products,
                    meta: { requiresAuth: true }
                },
                {
                    name: 'coupon',
                    path: 'Coupon',
                    component: Coupon,
                    meta: { requiresAuth: true }
                },
                {
                    name: 'order',
                    path: 'Order',
                    component: Order,
                    meta: { requiresAuth: true }
                },
            ],
            
        },

        {
            name: 'shop',
            path: '/Shop',
            component: Shop,
            children:[
                {
                    name: 'shopList',
                    path: '/',
                    component: ShopList,
                },
                {
                    name: 'shopDetail',
                    path: '/ShopDetail/:id',
                    component: ShopDetail,
                },
            ],
        },

        {
            name: 'cartMain',
            path: '/Cart',
            component: CartMain,
            children: [
                {
                    name: 'cart',
                    path: '/',
                    component: Cart,
                },
                {
                    name: 'cartOrder',
                    path: '/CartOrder',
                    component: CartOrder,
                },
                {
                    name: 'cartCheck',
                    path: '/CartCheck/:orderId',
                    component: CartCheck,
                }
            ],
        },
        
    ]
})