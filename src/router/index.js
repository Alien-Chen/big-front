import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import ChannelIndex from '@/views/channel'
import Type1 from '@/views/channel/type1.vue'
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

Vue.use(VueRouter)

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
    path: '/user/:uid',
    name: 'Home',
    props: true,
    component: User
  },
  {
    path: '/center',
    component: Center,
    linkActiveClass: 'layui-this',
    children: [
      {
        path: '',
        name: 'Center',
        component: UserCenter
      },
      {
        path: 'set',
        name: 'Set',
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
        name: 'Posts',
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
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'layui-this',
  routes
})

export default router
