<template>
  <div class="fly-header layui-bg-blue">
    <div class="layui-container">
      <!-- <a class="fly-logo" href="/">
        <img src="../assets/logo-2.png" alt="layui" />
      </a> -->
      <div class="logo-wrap">
        <div class="avatar">
          <img src="../assets/logo.jpeg" />
        </div>
        <span>小强社区</span>
      </div>
      <!-- <ul class="layui-nav fly-nav layui-hide-xs">
        <li class="layui-nav-item layui-this">
          <a href="#"> <i class="iconfont icon-jiaoliu"></i>交流 </a>
        </li>
        <li class="layui-nav-item">
          <a href="#"> <i class="iconfont icon-iconmingxinganli"></i>案例 </a>
        </li>
        <li class="layui-nav-item">
          <a href="#" target="_blank"> <i class="iconfont icon-ui"></i>框架 </a>
        </li>
      </ul> -->

      <ul class="layui-nav fly-nav-user">
        <template v-if="!isShow">
          <li class="layui-nav-item">
            <a
              class="header-icon iconfont icon-touxiang layui-hide-xs"
              href="../user/login.html"
            ></a>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{ name: 'Login' }">登入</router-link>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{ name: 'Reg' }">注册</router-link>
          </li>
          <!-- <li class="layui-nav-item layui-hide-xs">
            <a
              href
              onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
              title="QQ登入"
              class="iconfont icon-qq"
            ></a>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              href
              onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
              title="微博登入"
              class="iconfont icon-weibo"
            ></a>
          </li> -->
        </template>
        <template v-else>
          <li class="layui-nav-item" @mouseover="show()" @mouseleave="hide()">
            <a class="fly-nav-avatar" href="javascript:;">
              <cite class="layui-hide-xs">{{ userInfo.nickname }}</cite>
              <!-- <i class="iconfont icon-renzheng layui-hide-xs" title="认证信息：layui 作者"></i> -->
              <i
                class="layui-badge fly-badge-vip layui-hide-xs"
                v-show="userInfo.isVip !== '0'"
                >VIP{{ userInfo.isVip }}</i
              >
              <img :src="userInfo.pic" />
            </a>
            <dl
              class="layui-nav-child layui-anim layui-anim-upbit"
              :class="{ 'layui-show': isHover }"
            >
              <dd>
                <router-link :to="{ name: 'ChannelIndex' }">
                  <i
                    class="layui-icon"
                    style="margin-left: 2px; font-size: 22px"
                    >&#xe68e;</i
                  >主页
                </router-link>
              </dd>
              <dd>
                <router-link :to="{ name: 'Info' }">
                  <i class="layui-icon">&#xe620;</i>基本设置
                </router-link>
              </dd>
              <!-- <dd>
                <router-link :to="{ name: 'Msg' }">
                  <i class="iconfont icon-tongzhi" style="top: 4px"></i>我的消息
                </router-link>
              </dd> -->
              <dd>
                <a href="http://blog.chenzhiqiang.work" target="blank">
                  <i
                    class="layui-icon"
                    style="margin-left: 2px; font-size: 22px"
                    >&#xe7ae;</i
                  >我的博客
                </a>
              </dd>
              <hr style="margin: 5px 0" />
              <dd>
                <a
                  href="/user/logout/"
                  style="text-align: center"
                  @click.prevent="logout()"
                  >退出</a
                >
              </dd>
            </dl>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      isHover: false,
      hoverCtrl: {}
    }
  },
  methods: {
    show () {
      // 当用户的鼠标移入头像的时候，去显示操作菜单
      clearTimeout(this.hoverCtrl)
      this.hoverCtrl = setTimeout(() => {
        this.isHover = true
      }, 200)
    },
    hide () {
      // 当用户的鼠标移出头像的时候，去隐藏操作菜单
      clearTimeout(this.hoverCtrl)
      this.hoverCtrl = setTimeout(() => {
        this.isHover = false
      }, 500)
    },
    logout () {
      // this.$confirm('确定退出吗', () => {
      // localStorage.clear()
      localStorage.setItem('userInfo', '')
      localStorage.setItem('token', '')
      this.$store.commit('SETTOKEN', '')
      this.$store.commit('SETUSERINFO', {})
      this.$store.commit('SETISLOGIN', false)
      this.$router.push({ path: '/login' })
      this.isHover = false
      // })
    }
  },
  computed: {
    isShow () {
      return this.$store.state.isLogin
    },
    userInfo () {
      return this.$store.state.userInfo || {
        name: '',
        pic: '',
        isVip: 0
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.fly-logo {
  left: -15px;
  top: -10px;
  margin-left: 15px;
}

.layui-container {
  height: 100%;
}

.logo-wrap {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 100%;
  .avatar {
    margin-right: 10px;
    height: 40px;
    width: 40px;
    border-radius: 40px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  span {
    font-size: 20px;
  }
}
.header-icon {
  font-size: 28px;
}
</style>
