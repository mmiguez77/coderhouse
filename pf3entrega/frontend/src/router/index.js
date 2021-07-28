import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/productos',
    name: 'productos',
    component: () => import(/* webpackChunkName: "about" */ '../views/Producto.vue')
  },
  {
    path: '/tienda',
    name: 'tienda',
    component: () => import(/* webpackChunkName: "about" */ '../views/Tienda.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "about" */ '../views/Cart.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
