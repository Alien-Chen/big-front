<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li>
            <router-link :to="{ name: 'Reg' }">注册</router-link>
          </li>
        </ul>
        <div class="layui-form layui-tab-content">
          <ValidationObserver ref="form" v-slot="{ invalid }">
            <form class="layui-form layui-form-pane" @submit.prevent="onSubmit">
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
                  name="password"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <label class="layui-form-label">密码</label>
                  <div class="layui-input-block">
                    <input
                      v-model="password"
                      type="text"
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
                  <!-- <div class="layui-word-aux auth-code" v-html="svg" @click="getCaptcha"></div> -->
                  <div class="error-text">
                    <span>{{ errors[0] }}</span>
                  </div>
                </validation-provider>
              </div>
              <div class="layui-form-item">
                <div class="layui-input-block">
                  <button
                    class="layui-btn layui-btn-normal"
                    type="submit"
                    :disabled="invalid"
                    lay-filter="formDemo"
                  >
                    点击登录
                  </button>
                  <router-link :to="{ name: 'Forget' }" class="a-btn"
                    >忘记密码</router-link
                  >
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
import { login } from '@/api/login'

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
      this.$refs.form.validate().then(success => {
        if (!success) {
          return
        }
        const userInfo = {
          username: this.username,
          password: this.password,
          code: this.authCode,
          sid: this.$store.state.uuid
        }

        login(userInfo).then(res => {
          if (res.code === 200) {
            // this.$message(res.message)
            this.$store.commit('SETUSERINFO', res.data)
            this.$store.commit('SETISLOGIN', true)
            this.$store.commit('SETTOKEN', res.token)
            this.username = ''
            this.password = ''
            this.code = ''
            this.$router.push({ name: 'ChannelIndex' })
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

.layui-container {
  background: #fff;
}
.a-btn {
  margin-left: 10px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    color: $color-primary;
  }
}
input {
  width: 250px !important;
}
</style>
