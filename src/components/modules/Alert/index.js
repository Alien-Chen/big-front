import Alert from './Alert'

const AlertPlugin = {
  install: function (Vue) {
    const Component = Vue.extend(Alert) // Vue.extend 返回的是组件构造器
    const instance = new Component() // 组件实例
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)

    Vue.prototype.$message = (msg, success, cancel) => {
    // 逻辑...
      instance.type = 'confirm'
      instance.msg = msg
      instance.isShow = true
      if (typeof success !== 'undefined') {
        instance.success = success
      }
      if (typeof cancel !== 'undefined') {
        instance.cancel = cancel
      }
    }
    Vue.prototype.$close = function () {
      instance.isShow = false
      instance.msg = ''
    }
  }
}

export default AlertPlugin
