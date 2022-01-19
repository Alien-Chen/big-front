import axios from 'axios'

class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
  }

  // 合并配置项
  mergeRequestConfig (option) {
    const baseConfig = {
      baseURL: this.baseUrl,
      timeout: 60 * 10,
      headers: { 'Content-Type': 'application/json;charset=utf-8' }
    }
    const config = Object.assign(baseConfig, option)
    return config
  }

  // 拦截逻辑
  interceptors (instance) {
    instance.interceptors.request.use((config) => {
      return config
    }, (error) => {
      return Promise.reject(error)
    })

    instance.interceptors.response.use((res) => {
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
