import request from '@/utils/request'
import qs from 'qs'
import store from '@/store'

// 获取文章中的评论列表
const getComents = (params) => {
  const token = store.state.token
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        Authorization: 'Bearer ' + store.state.token
      }
    }
  }
  return request.get('/public/comments?' + qs.stringify(params), headers)
}

const addComment = (data) => request.post('/comments/reply', { ...data })

// 更新评论
const updateComment = (data) => request.post('/comments/update', { ...data })

const setCommentBest = (params) => request.get('/comments/accept?' + qs.stringify(params))

// 设置点赞
const setHands = (params) => request.get('/comments/hands?' + qs.stringify(params))

export {
  getComents,
  addComment,
  updateComment,
  setCommentBest,
  setHands
}
