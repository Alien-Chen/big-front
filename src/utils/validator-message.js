import { Validator } from 'vee-validate'
const dict = {
  'zh-CN': {
    messages: {
      required: filed => filed + '不能为空',
      email: () => '请输入正确的邮箱格式',
      length: (filed, params, data) => {
        const length = params[0]
        return filed + '长度为' + length
      }
    },
    attributes: {
      username: '用户名',
      password: '密码',
      authCode: '验证码'
    }
  }
}

Validator.localize(dict)
