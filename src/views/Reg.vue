<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{ name: 'Login' }">登录</router-link>
          </li>
          <li class="layui-this">注册</li>
        </ul>
        <div class="layui-form layui-tab-content">
          <ValidationObserver ref="form" v-slot="{ invalid }">
            <form class="layui-form layui-form-pane" action="">
              <div class="layui-form-item">
                <validation-provider
                  name="username"
                  rules="required|email"
                  v-slot="{ errors }"
                >
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
                  name="nickname"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <label class="layui-form-label">昵称</label>
                  <div class="layui-input-block">
                    <input
                      type="text"
                      v-model="nickname"
                      name="nickname"
                      placeholder="请输入昵称"
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
                  name="password"
                  rules="required:length:6"
                  v-slot="{ errors }"
                >
                  <label class="layui-form-label">密码</label>
                  <div class="layui-input-block">
                    <input
                      v-model="password"
                      type="password"
                      name="password"
                      placeholder="请输入密码"
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
                  name="repeatPassword"
                  rules="required:length:6|password:@password"
                  v-slot="{ errors }"
                >
                  <label class="layui-form-label">确认密码</label>
                  <div class="layui-input-block">
                    <input
                      v-model="repeatPassword"
                      type="password"
                      name="repeatPassword"
                      placeholder="请输入密码"
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
                  name="authCode"
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
                  <Captcha />
                  <div class="error-text">
                    <span>{{ errors[0] }}</span>
                  </div>
                </validation-provider>
              </div>
              <div class="layui-form-item">
                <div class="layui-input-block">
                  <button
                    class="layui-btn"
                    lay-submit
                    lay-filter="formDemo"
                    :disabled="invalid"
                    @click.prevent="onSubmit"
                  >
                    提交
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
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Captcha from '@/components/Captcha'
import { reg } from '@/api/login'

export default {
  name: 'Reg',
  data () {
    return {
      username: '',
      password: '',
      authCode: '',
      nickname: '',
      repeatPassword: ''
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    Captcha
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate().then(success => {
        if (!success) {
          return
        }
        const params = {
          username: this.username,
          password: this.password,
          code: this.authCode,
          nickname: this.nickname,
          sid: this.$store.state.uuid
        }
        reg(params).then(res => {
          if (res.code === 200) {
            this.$message('注册成功,请登录')
            setTimeout(() => {
              this.$router.push({
                name: 'Login'
              })
              this.$close()
            }, 1000)
          } else {
            this.$refs.form.setErrors(res.message)
          }
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
