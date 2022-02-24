<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{ name: 'Login' }">登录</router-link>
          </li>
          <li class="layui-this">找回密码</li>
        </ul>
        <div class="layui-form layui-tab-content">
          <ValidationObserver ref="form">
            <form class="layui-form layui-form-pane" @submit.prevent="onSubmit">
              <div class="layui-form-item">
                <validation-provider rules="required|email" v-slot="{ errors }">
                  <label class="layui-form-label">用户名</label>
                  <div class="layui-input-block">
                    <input
                      type="text"
                      v-model="username"
                      name="username"
                      placeholder="请输入用户名"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                  <div class="error-text">
                    <span>{{ errors[0] }}</span>
                  </div>
                </validation-provider>
              </div>
              <div class="layui-form-item">
                <validation-provider
                  rules="required|length:4"
                  v-slot="{ errors }"
                >
                  <label class="layui-form-label">验证码</label>
                  <div class="layui-input-inline">
                    <input
                      type="text"
                      name="authCode"
                      v-model="authCode"
                      lay-verify="required"
                      placeholder="请输入验证码"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                  <!-- <div class="layui-word-aux auth-code" v-html="svg" @click="getCaptcha"></div> -->
                  <Captcha />
                  <div class="error-text">
                    <span>{{ errors[0] }}</span>
                  </div>
                </validation-provider>
              </div>
              <div class="layui-form-item">
                <div class="layui-input-block">
                  <button class="layui-btn" lay-filter="formDemo" type="submit">
                    找回密码
                  </button>
                </div>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { forgetPassword } from '@/api/login.js'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Captcha from '@/components/Captcha'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      authCode: ''
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    Captcha
  },
  methods: {
    onSubmit () {
      const params = {
        username: this.username,
        code: this.authCode,
        user: 'chen'
      }
      this.$refs.form.validate().then(success => {
        if (!success) {
          return
        }
        forgetPassword(params).then(res => {
          console.log(res)
        })
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
  color: rgba(240, 20, 20, 0.8);
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
    color: #b6cd59;
  }
}
input {
  width: 250px !important;
}
</style>
