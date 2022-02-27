<template>
  <div>
    <ul class="fly-list">
      <li v-for="item in items" :key="item._id">
        <a href="user/home.html" class="fly-avatar">
          <img :src="item.uid.pic" alt="头像" />
        </a>
        <h2>
          <a class="layui-badge">{{ item.catalog }}</a>
          <router-link :to="{ name: 'Detail', params: { tid: item._id } }">{{
            item.title
          }}</router-link>
        </h2>
        <div class="fly-list-info">
          <a href="user/home.html" link>
            <cite>{{ item.uid.nickname }}</cite>
            <!--<i class="iconfont icon-renzheng" title="认证信息：XXX"></i>-->
            <i class="layui-badge fly-badge-vip">{{
              "VIP" + item.uid.isVip
            }}</i>
          </a>
          <span>{{ item.created | createDate }}</span>

          <span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻">
            <i class="iconfont icon-kiss"></i> {{ item.fav }}
          </span>
          <span
            class="layui-badge fly-badge-accept layui-hide-xs"
            v-if="item.status !== 0"
            >已结</span
          >
          <span class="fly-list-nums">
            <i class="iconfont icon-pinglun1" title="回答"></i>
            {{ item.answer }}
          </span>
        </div>
        <div class="fly-list-badge" v-show="item.tags.length > 0">
          <span
            class="layui-badge layui-bg-red"
            v-for="(tag, index) in item.tags"
            :key="'tag' + index"
            :class="tag.class"
            >{{ tag.name }}</span
          >
        </div>
      </li>
    </ul>
    <div style="text-align: center" v-if="isPage">
      <div class="laypage-main" v-if="!isEnd">
        <a href="jie/index.html" class="laypage-next" @click.prevent="more"
          >更多求解</a
        >
      </div>
      <div class="nomore gray" v-else>没有更多了</div>
    </div>
  </div>
</template>

<script>

import _ from 'lodash'

export default {
  name: 'ListItem',
  props: {
    list: {
      default: () => [],
      type: Array
    },
    isEnd: {
      default: false,
      type: Boolean
    },
    isPage: {
      defalut: true,
      type: Boolean
    }
  },
  computed: {
    items () {
      _.map(this.list, (item, index) => {
        switch (item.catalog) {
          case 'ask':
            item.catalog = '提问'
            break
          case 'share':
            item.catalog = '分享'
            break
          case 'logs':
            item.catalog = '动态'
            break
          case 'notice':
            item.catalog = '公告'
            break
          case 'advise':
            item.catalog = '建议'
            break
          case 'discuss':
            item.catalog = '交流'
            break
        }
      })
      return this.list
    }
  },
  // filters: {
  //   createDate (val) {
  //     if (moment(val).isBefore(moment().subtract(7, 'days'))) {
  //       return moment(val).format('YYYY-MM-DD')
  //     } else {
  //       return moment().from(val)
  //     }
  //   }
  // },
  methods: {
    more () {
      this.$emit('nextPage')
    }
  }
}
</script>

<style lang="scss" scoped>
.nomore {
  font-size: 16px;
  padding: 30px 0;
}
</style>
