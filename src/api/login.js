import axios from 'axios'

export const getCaptcha = () => {
  return axios.get('/getCaptcha')
}
