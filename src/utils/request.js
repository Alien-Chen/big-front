import HttpRequest from './axios'
import config from '../config'

const baseUrl = process.env.NODE_ENV === 'dev' ? config.BaseUrl.dev : config.BaseUrl.prod

export default new HttpRequest(baseUrl)
