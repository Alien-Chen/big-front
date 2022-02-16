<template>
  <div class="fly-panel fly-link">
    <h3 class="fly-panel-title">友情链接</h3>
    <dl class="fly-panel-main">
      <dd v-for="(item, index) in lists" :key="'link' + index">
        <a :href="item.link" target="_blank">{{ item.title }}</a>
      </dd>
      <dd></dd>
    </dl>
  </div>
</template>

<script>
import { getLinks } from '@/api/content'
export default {
  name: 'links',
  data () {
    return {
      lists: []
    }
  },
  mounted () {
    this._getLinks()
  },
  methods: {
    _getLinks () {
      getLinks().then(res => {
        if (res.code === 200) {
          this.lists = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
