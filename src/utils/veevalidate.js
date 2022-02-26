import { extend, localize } from 'vee-validate'
// eslint-disable-next-line
import { required, email, length, min, max, is_not } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN.json'

extend('required', required)
extend('email', email)
extend('length', length)
extend('min', min)
extend('max', max)
extend('is_not', is_not)
extend('password', {
  params: ['target'],
  validate: (value, { target }) => {
    return value === target
  },
  message: '两次密码不一致'
})

// // Custom validate
extend('nickname', {
  validate: value => {
    // console.log((/^\d+/).test(value))
    return !(/^\d+/).test(value)
  },
  message: '不能以纯数字为昵称'
})

localize('zh_CN', {
  messages: {
    ...zh.messages,
    required: '请输入{_field_}，{_field_}不能为空',
    email: '邮箱格式不正确，请输入正确邮箱',
    length: (name, data) => {
      return `${name} 的长度需为 ${data.length}`
    }
  },
  names: {
    username: '用户名',
    nickname: '昵称',
    password: '密码',
    repeatPassword: '确认密码',
    authCode: '验证码',
    oldpassword: '旧密码',
    title: '标题',
    catalog: '分类'
  },
  fields: {
    catalog: {
      is_not: '请选择{_field_}'
    },
    username: {
      email: '用户名需要是邮箱，请输入正确格式的邮箱'
    }
  }
})
