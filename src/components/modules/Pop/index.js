import Pop from './Pop.vue'
import Vue from 'vue'
const PopPlugin = {}

PopPlugin.install = (vue) => {
  const PopConstruct = Vue.extend(Pop)
  const instance = new PopConstruct()
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  Vue.prototype.$pop = function (type, msg) {
    instance.type = type
    instance.msg = msg
    instance.isShow = true
  }
}

export default PopPlugin
