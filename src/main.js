import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import AlertPlugin from '@/components/modules/Alert'

import '@/utils/veevalidate.js'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000'
Vue.use(AlertPlugin)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
