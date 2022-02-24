import request from '@/utils/request'

export const userSign = () => request.get('/user/fav')
