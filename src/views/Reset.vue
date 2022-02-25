<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link to="/login">登录</router-link>
          </li>
          <li class="layui-this">
            <router-link to="/forget">重置密码</router-link>
          </li>
        </ul>
        <div
          class="layui-form layui-tab-content"
          id="LAY_ucm"
          style="padding: 20px 0"
        >
          <validation-observer ref="observer" v-slot="{ invalid }">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form>
                  <div class="layui-form-item">
                    <ValidationProvider
                      name="password"
                      rules="required|min:6|max:16"
                      v-slot="{ errors }"
                    >
                      <div class="layui-row">
                        <label for="L_phone" class="layui-form-label"
                          >新密码</label
                        >
                        <div class="layui-input-inline">
                          <input
                            type="password"
                            id="L_phone"
                            name="phone"
                            v-model="password"
                            class="layui-input"
                          />
                        </div>
                        <div class="layui-form-mid layui-word-aux">
                          6到16个字符
                        </div>
                      </div>
                      <div class="layui-row">
                        <span class="error-text">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="layui-form-item">
                    <ValidationProvider
                      v-slot="{ errors }"
                      vid="confirmation"
                      name="repeatPassword"
                      rules="required|min:6|max:16|password:@password"
                    >
                      <div class="layui-row">
                        <label for="L_imagecode1" class="layui-form-label"
                          >确认密码</label
                        >
                        <div class="layui-input-inline">
                          <input
                            type="password"
                            name="repassword"
                            v-model="repassword"
                            class="layui-input"
                          />
                        </div>
                      </div>
                      <div class="layui-row">
                        <span class="error-text">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="layui-form-item">
                    <validation-provider
                      name="authCode"
                      ref="codefield"
                      rules="required|length:4"
                      v-slot="{ errors }"
                    >
                      <div class="layui-row">
                        <label for="L_vercode" class="layui-form-label"
                          >验证码</label
                        >
                        <div class="layui-input-inline">
                          <input
                            type="text"
                            v-model="code"
                            placeholder="请输入验证码"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                      </div>
                      <Captcha ref="captcha" />
                      <div class="error-text">
                        <span>{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <button
                      class="layui-btn"
                      :disabled="invalid"
                      type="button"
                      @click="submit()"
                    >
                      提交
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { reset } from '@/api/login'
import { getParam } from '@/utils/common'
import Captcha from '@/components/Captcha'
// import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'reset',
  components: {
    ValidationProvider,
    ValidationObserver,
    Captcha
  },
  data () {
    return {
      key: '',
      password: '',
      repassword: '',
      code: '',
      svg: ''
    }
  },
  mounted () {
    this.key = getParam('key')
  },
  methods: {
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        // ABORT!!
        return
      }
      reset({
        key: this.key,
        password: this.password,
        sid: this.$store.state.uuid,
        code: this.code
      }).then(res => {
        if (res.code === 200) {
          this.$message('密码修改成功！')
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        } else {
          this.$refs.captcha.getCaptcha()
          if (res.msg instanceof Array) {
            this.$refs.codefield.setErrors([res.msg])
          } else {
            this.$message(res.msg)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.error-text {
  display: block;
  color: rgba(240, 20, 20, 0.8);
}
</style>
