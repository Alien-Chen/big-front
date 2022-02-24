import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AlertPlugin from '@/components/modules/Alert'
import './utils/dayjs'
import '@/utils/veevalidate.js'
import PopPlugin from '@/components/modules/Pop'

Vue.config.productionTip = false
Vue.use(AlertPlugin)
Vue.use(PopPlugin)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
