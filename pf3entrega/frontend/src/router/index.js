import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../components/404.vue'

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
    component: () => import('../views/Producto.vue')
  },
  {
    path: '/tienda',
    name: 'tienda',
    component: () => import('../views/Tienda.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
