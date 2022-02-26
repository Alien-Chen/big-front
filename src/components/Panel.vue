<template>
  <div class="panel">
    <div class="layui-container" style="overflow: hidden">
      <ul>
        <router-link tag="li" to="/" class="layui-hide-xs">
          <a href="/">首页</a>
        </router-link>
        <router-link
          v-for="item in items"
          :key="item.id"
          tag="li"
          :to="item.path"
        >
          <a href="jie/index.html">
            {{ item.name }}
            <span class="layui-badge-dot" v-if="item.isNew"></span>
          </a>
        </router-link>
        <!-- 用户登录后才显示 -->
        <template v-if="isLogin">
          <li class="layui-hide-xs"><span class="line"></span></li>
          <li class="layui-hide-xs layui-hide-sm"><a href>我发表的贴</a></li>
          <li class="layui-hide-xs layui-hide-sm"><a href>我收藏的贴</a></li>
        </template>
      </ul>
      <div class="right layui-hide-xs">
        <span class="layui-icon layui-icon-search"></span>
        <router-link to="/add" class="layui-btn">发表新帖</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Panel',
  data () {
    return {
      items: [
        {
          path: '/index/ask',
          isNew: false,
          name: '提问',
          id: 1
        },
        {
          path: '/index/share',
          isNew: true,
          name: '分享',
          id: 2
        },
        {
          path: '/index/discuss',
          isNew: false,
          name: '讨论',
          id: 3
        },
        {
          path: '/index/advise',
          isNew: false,
          name: '建议',
          id: 4
        },
        {
          path: '/index/notice',
          isNew: false,
          name: '公告',
          id: 5
        },
        {
          path: '/index/logs',
          isNew: false,
          name: '动态',
          id: 6
        }
      ],
      isLogin: this.$store.isLogin // 存到store中

    }
  }
}
</script>

<style scoped lang="scss">
@media (max-width: 768px) {
  .panel {
    height: auto !important;
  }
  ul {
    li {
      width: 33.3%;
    }
  }
}
.panel {
  height: 50px;
  line-height: 50px;
  margin-bottom: 15px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
ul {
  width: 100%;
  float: left;
  margin-right: -200px;
  li {
    display: inline-block;
    a {
      padding: 0 20px;
    }
    &.layui-this {
      a {
        color: $color-primary;
      }
    }
  }
  .line {
    display: inline-block;
    height: 10px;
    width: 1px;
    vertical-align: middle;
    margin: 0 20px;
    background: $color-text-primary;
  }
}
.right {
  float: right;
  .layui-icon-search {
    margin-right: 20px;
    font-size: 20px;
    &:hover {
      color: $color-primary;
      cursor: pointer;
    }
  }
}
</style>
