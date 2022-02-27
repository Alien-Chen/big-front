import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AlertPlugin from '@/components/modules/Alert'
import '@/utils/veevalidate.js'
import PopPlugin from '@/components/modules/Pop'
import filters from '@/utils/filter'
import directives from '@/utils/directives'

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
Vue.use(AlertPlugin)
Vue.use(PopPlugin)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
