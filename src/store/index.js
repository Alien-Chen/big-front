import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uuid: '',
    token: '',
    isLogin: false,
    userInfo: {}
  },
  mutations: {
    SETUUID (state, uid) {
      state.uuid = uid
    },
    SETUSERINFO (state, value) {
      if (value === '') return
      state.userInfo = value
      // console.log(value)
      localStorage.setItem('userInfo', JSON.stringify(value))
    },
    // 设置isLogin的状态
    SETISLOGIN (state, value) {
      state.isLogin = value
    },
    SETTOKEN (state, value) {
      state.token = value
      localStorage.setItem('token', value)
    }
  },
  actions: {
  },
  modules: {
  }
})
