import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uuid: ''
  },
  mutations: {
    SETUUID (state, uid) {
      state.uuid = uid
    }
  },
  actions: {
  },
  modules: {
  }
})
