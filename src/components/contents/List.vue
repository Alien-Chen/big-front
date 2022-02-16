<template>
  <div class="fly-panel" style="margin-bottom: 0">
    <div class="fly-panel-title fly-filter">
      <a
        href
        :class="{ 'layui-this': current === '' }"
        @click.prevent="search('')"
        >综合</a
      >
      <span class="fly-mid"></span>
      <a
        :class="[current === '0' ? 'layui-this' : '']"
        href
        @click.prevent="search('0')"
        >未结</a
      >
      <span class="fly-mid"></span>
      <a
        :class="{ 'layui-this': current === '1' }"
        href
        @click.prevent="search('1')"
        >已结</a
      >
      <span class="fly-mid"></span>
      <a
        :class="{ 'layui-this': current === '2' }"
        href
        @click.prevent="search('2')"
        >精华</a
      >
      <span class="fly-filter-right layui-hide-xs">
        <a
          :class="[sort === 'created' ? 'layui-this' : '']"
          href
          @click.prevent="search('3')"
          >按最新</a
        >
        <span class="fly-mid"></span>
        <a
          :class="[sort === 'answer' ? 'layui-this' : '']"
          href
          @click.prevent="search('4')"
          >按热议</a
        >
      </span>
    </div>
    <ListItems
      :list="list"
      :isPage="true"
      :isEnd="isEnd"
      @nextPage="_getMore"
    />
  </div>
</template>

<script>
import ListMixin from './ListMixin'
export default {
  name: 'list',
  mixins: [ListMixin],
  watch: {
    current (newval, oldval) {
      console.log('current: ' + oldval + ',' + newval)
      this.init()
    },
    sort () {
      this.page = 0
      this.list = []
      this.isEnd = false
      this._getList()
    },
    $route: {
      handler (newval, oldval) {
        const catalog = this.$route.params.catalog
        if (catalog) {
          this.catalog = catalog
        }
        this.init()
      }
    }
  },
  mounted () {
    this._getList(0)
  },
  methods: {
    init () {
      this.page = 0
      this.list = []
      this.isEnd = false
      this._getList()
    },
    _getMore () {
      // this.page++
      this._getList()
    },
    search (status) {
      switch (status) {
        case '':
          this.status = ''
          this.current = status
          break
        case '0':
          this.status = '0'
          this.current = status
          break
        case '1':
          this.status = '1'
          this.current = status
          break
        case '2':
          this.status = '精华'
          this.current = status
          break
        case '3':
          this.sort = 'created'
          break
        case '4':
          this.sort = 'answer'
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
