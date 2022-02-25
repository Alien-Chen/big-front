import request from '@/utils/request'
import qs from 'qs'

export const userSign = () => request.get('/user/fav')

export const updateUserInfo = (data) => request.post('/user/basic', data)

export const updateUsername = (data) => request.get('/public/reset-email?' + qs.stringify(data))

// 修改用户密码
export const changePasswd = (data) => request.post('/user/change-password', {
  ...data
})
