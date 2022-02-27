import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import ChannelIndex from '@/views/channel'
import Type1 from '@/views/channel/type1.vue'
import store from '@/store'

import jwt from 'jsonwebtoken'
import moment from 'dayjs'

const Login = () => import(/* webpackChunkName: 'login' */'@/views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ '@/views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */ '@/views/Forget.vue')
const Center = () => import(/* webpackChunkName: 'forget' */ '@/views/Center.vue')

const UserCenter = () =>
  import(/* webpackChunkName: 'user-center' */ '@/components/user/Center.vue')
const Settings = () =>
  import(/* webpackChunkName: 'settings' */ '@/components/user/Setting.vue')
const Posts = () =>
  import(/* webpackChunkName: 'user-post' */ '@/components/user/Posts.vue')
const Msg = () =>
  import(/* webpackChunkName: 'user-msg' */ '@/components/user/Msg.vue')
// const Others = () =>
//   import(/* webpackChunkName: 'othres' */ '@/components/user/Others.vue')
const User = () =>
  import(/* webpackChunkName: 'home' */ '@/views/User.vue')

const MyInfo = () =>
  import(/* webpackChunkName: 'info' */ '@/components/user/common/MyInfo.vue')
const PicUpload = () =>
  import(/* webpackChunkName: 'uploadpic' */ '@/components/user/common/PicUpload.vue')
const Passwd = () =>
  import(/* webpackChunkName: 'password' */ '@/components/user/common/Passwd.vue')
const Accounts = () =>
  import(/* webpackChunkName: 'accounts' */ '@/components/user/common/Accounts.vue')

const MyPost = () =>
  import(/* webpackChunkName: 'mypost' */ '@/components/user/common/MyPost.vue')
const MyCollection = () =>
  import(/* webpackChunkName: 'mycollection' */ '@/components/user/common/MyCollection.vue')

const NoFound = () => import(/* webpackChunkName: 'nofound' */ '@/views/NoFound.vue')
const Confirm = () =>
  import(/* webpackChunkName: 'confirm' */ '@/views/Confirm.vue')
const Reset = () =>
  import(/* webpackChunkName: 'reset' */ '@/views/Reset.vue')

const Add = () => import(/* webpackChunkName: 'reset' */ '@/components/contents/Add.vue')
Vue.use(VueRouter)

const Detail = () =>
  import(/* webpackChunkName: 'detail' */ '@/components/contents/Detail.vue')

const routes = [
  {
    path: '/',
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
  },
  {
    path: '/add',
    name: 'Add',
    component: Add,
    meta: { requiresAuth: true }
  },
  {
    path: '/detail/:tid',
    name: 'Detail',
    props: true,
    component: Detail
  },
  {
    path: '/user/:uid',
    name: 'Home',
    props: true,
    component: User
  },
  {
    path: '/confirm',
    name: 'confirm',
    component: Confirm
  },
  {
    path: '/reset',
    name: 'reset',
    component: Reset
  },
  {
    path: '/center',
    component: Center,
    meta: { requiresAuth: true },
    linkActiveClass: 'layui-this',
    children: [
      {
        path: '',
        name: 'Center',
        component: UserCenter
      },
      {
        path: 'set',
        component: Settings,
        children: [
          {
            path: '',
            name: 'Info',
            component: MyInfo
          },
          {
            path: 'pic',
            name: 'Pic',
            component: PicUpload
          },
          {
            path: 'passwd',
            name: 'Passwd',
            component: Passwd
          },
          {
            path: 'account',
            name: 'Account',
            component: Accounts
          }
        ]
      },
      {
        path: 'posts',
        component: Posts,
        children: [
          {
            path: '',
            name: 'Mypost',
            component: MyPost
          },
          {
            path: 'mycollection',
            name: 'Mycollection',
            component: MyCollection
          }
        ]
      },
      {
        path: 'msg',
        name: 'Msg',
        component: Msg
      }
      // {
      //   path: 'others',
      //   name: 'Others',
      //   component: Others
      // }
    ]
  },
  {
    path: '/404',
    component: NoFound
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'layui-this',
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const uuid = localStorage.getItem('uuid')
  if (token !== '' && token !== null) {
    const payload = jwt.decode(token)
    if (moment().isBefore(moment(payload.exp * 1000))) {
      // 设置localStorage里面的缓存的token信息 + 用户信息
      store.commit('SETTOKEN', token)
      store.commit('SETUSERINFO', userInfo)
      store.commit('SETISLOGIN', true)
      store.commit('SETUUID', uuid)
    } else {
      localStorage.clear()
    }
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isLogin = store.state.isLogin
    if (isLogin) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
