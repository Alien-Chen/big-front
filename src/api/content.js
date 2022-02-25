import request from '@/utils/request'
import qs from 'qs'

/**
 * 读取文章列表
 * @param {Object} params 读取文章列表的接口参数
 * @returns
 */
export const getList = (params) => {
  return request.get('/public/list?' + qs.stringify(params))
}

// 读取温馨提醒接口
export const getTips = () => {
  return request.get('/public/tips')
}

// 读取友情链接
export const getLinks = () => {
  return request.get('/public/links')
}

// 读取本周热议接口
export const getTopWeek = () => {
  return request.get('/public/topWeek')
}

export const uploadImg = (formData) => request.post('/content/upload', formData)
