<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li>
            <router-link :to="{name: 'Reg'}">注册</router-link>
          </li>
        </ul>
        <div class="layui-form layui-tab-content">
          <div>
            <form class="layui-form layui-form-pane" action="">
              <div class="layui-form-item">
                <validation-provider rules="required|email" v-slot="{ errors }">
                  <label class="layui-form-label">用户名</label>
                  <div class="layui-input-block">
                    <input type="text" v-model="username" name="用户名" placeholder="请输入用户名" autocomplete="off" class="layui-input">
                  </div>
                  <div class="error-text">
                    <span>{{ errors[0] }}</span>
                  </div>
                </validation-provider>
              </div>
              <div class="layui-form-item">
                <validation-provider rules="required" v-slot="{ errors }">
                  <label class="layui-form-label">密码</label>
                  <div class="layui-input-block">
                    <input v-model="password" type="text" name="密码" placeholder="请输入密码" autocomplete="off" class="layui-input">
                  </div>
                  <div class="error-text">
                    <span>{{ errors[0] }}</span>
                  </div>
                </validation-provider>
              </div>
              <div class="layui-form-item">
                <validation-provider rules="required|length:4" v-slot="{ errors }">
                  <label class="layui-form-label">验证码</label>
                  <div class="layui-input-inline">
                    <input type="text" name="验证码" v-model="authCode" lay-verify="required" placeholder="请输入验证码" autocomplete="off" class="layui-input">
                  </div>
                  <div class="layui-word-aux auth-code" v-html="svg" @click="getCaptcha"></div>
                  <div class="error-text">
                    <span>{{ errors[0] }}</span>
                  </div>
                </validation-provider>
              </div>
              <div class="layui-form-item">
                <div class="layui-input-block">
                  <button class="layui-btn" lay-submit lay-filter="formDemo">点击登录</button>
                  <router-link :to="{name: 'Forget'}" class="a-btn">忘记密码</router-link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
   </div>
</template>
<script>
import { ValidationProvider, extend } from 'vee-validate'
import { required, email, length } from 'vee-validate/dist/rules'
import { getCaptcha } from '@/api/login.js'

extend('length', {
  ...length,
  message: (name, data) => {
    return `${name} 的长度需为${data.length}`
  }
})

extend('email', {
  ...email,
  message: '请输入正确邮箱格式'
})

extend('required', {
  ...required,
  message: '{_field_} 不能为空'
})

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      authCode: '',
      svg: ''
    }
  },
  components: {
    ValidationProvider
  },
  mounted () {
    this.getCaptcha()
  },
  methods: {
    getCaptcha () {
      getCaptcha().then(res => {
        if (res.status === 200) {
          this.svg = res.data.data
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-wrap {
  background: #ccc;
}
.error-text {
  display: block;
  color: rgba(240,20,20,.8);
}
.auth-code {
  display: inline-block;
  position: relative;
  top: 0px;
  left: 60px;
}
.layui-container {
  background: #fff;
}
.a-btn {
  margin-left: 10px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    color: #009688;
  }
}
input {
  width: 250px !important;
}
</style>
