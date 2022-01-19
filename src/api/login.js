import request from '@/utils/request'

export const getCaptcha = (params) => {
  return request.get('/public/getCaptcha', { params })
}

export const forgetPassword = (data) => {
  return request.post('/login/forget', data)
}

export const login = (data) => {
  return request.post('/login/login', data)
}

export const reg = (data) => {
  return request.post('/login/reg', data)
}
