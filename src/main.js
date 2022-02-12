import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AlertPlugin from '@/components/modules/Alert'

import '@/utils/veevalidate.js'

Vue.config.productionTip = false
Vue.use(AlertPlugin)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
