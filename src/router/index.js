import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import ChannelIndex from '@/views/channel'
import Type1 from '@/views/channel/type1.vue'
const Login = () => import(/* webpackChunkName: 'login' */'@/views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ '@/views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */ '@/views/Forget.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        component: ChannelIndex,
        name: 'ChannelIndex'
      },
      {
        path: '/index/:catalog',
        name: 'catalog',
        component: Type1
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/reg',
    name: 'Reg',
    component: Reg
  }, {
    path: '/forget',
    name: 'Forget',
    component: Forget
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'layui-this',
  routes
})

export default router
