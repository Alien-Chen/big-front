import axios from 'axios'

const CancelToken = axios.CancelToken
class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
    this.pending = {}
  }

  // 合并配置项
  mergeRequestConfig (option) {
    const baseConfig = {
      baseURL: this.baseUrl,
      timeout: 60 * 100,
      headers: { 'Content-Type': 'application/json;charset=utf-8' }
    }
    const config = Object.assign(baseConfig, option)
    return config
  }

  removePending (key, isRequest = false) {
    if (this.pending[key] && isRequest) {
      this.pending[key]('请求被取消')
    }
    delete this.pending[key]
  }

  // 拦截逻辑
  interceptors (instance) {
    instance.interceptors.request.use((config) => {
      const key = config.url + '&' + config.method
      this.removePending(key, true)
      config.cancelToken = new CancelToken((c) => {
        this.pending[key] = c
      })
      // console.log(this.pending)
      return config
    }, (error) => {
      return Promise.reject(error)
    })

    instance.interceptors.response.use((res) => {
      const key = res.config.url + '&' + res.config.method
      this.removePending(key)
      if (res.status === 200) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(res)
      }
    }, (error) => {
      return Promise.reject(error)
    })
  }

  // 生成实例
  request (option) {
    const instance = axios.create()
    const newOption = this.mergeRequestConfig(option)
    this.interceptors(instance)
    return instance(newOption)
  }

  // get 方法
  get (url, config) {
    const getDefault = {
      method: 'get',
      url
    }
    // console.log(config)
    const op = Object.assign(getDefault, config)
    return this.request(op)
  }

  // post 方法
  post (url, data) {
    const postDefault = {
      method: 'post',
      url
    }
    const op = Object.assign(postDefault, {
      data
    })
    return this.request(op)
  }
}

export default HttpRequest
