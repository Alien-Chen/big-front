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
      state.userInfo = value
    },
    // 设置isLogin的状态
    SETISLOGIN (state, value) {
      state.isLogin = value
    }
  },
  actions: {
  },
  modules: {
  }
})
