<template>
  <div class="layui-container fly-marginTop fly-user-main">
    <ul class="layui-nav layui-nav-tree" lay-filter="test">
      <!-- 侧边导航: <ul class="layui-nav layui-nav-tree layui-nav-side"> -->
      <li
        class="layui-nav-item"
        v-for="(item, index) in lists"
        :key="'center' + index"
      >
        <router-link :to="{ name: item.link }" :active-class="item.activeClass">
          <i class="layui-icon" :class="item.icon"></i>
          {{ item.name }}
        </router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'center',
  data () {
    return {
      lists: [
        // {
        //   name: '我的主页',
        //   icon: 'layui-icon-home',
        //   link: 'home'
        // },
        {
          name: '用户中心',
          icon: 'layui-icon-friends',
          link: 'Center'
        },
        {
          name: '基本设置',
          icon: 'layui-icon-set',
          link: 'Info',
          activeClass: 'layui-this'
        }
        // {
        //   name: '我的帖子',
        //   icon: 'layui-icon-form',
        //   link: 'Mypost',
        //   activeClass: 'layui-this'
        // },
        // {
        //   name: '我的消息',
        //   icon: 'layui-icon-reply-fill',
        //   link: 'Msg'
        // }
        // {
        //   name: '其他设置',
        //   icon: 'layui-icon-component',
        //   link: 'Others'
        // }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.layui-nav {
  background-color: #fff;
  .layui-nav-item {
    a {
      color: $color-text-primary;
      &:hover {
        background: $color-primary;
        color: #fff;
      }
      &.layui-this {
        color: #fff;
      }
    }
  }
}
</style>
