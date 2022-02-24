<template>
  <div class="fly-panel">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a
        href="#signin"
        class="layui-hide-sm layui-show-xs-block fly-right"
        id="LAY_goSignin"
        style="color: #f11718"
        >去签到</a
      >
    </div>
    <ListItems :list="list" :isPage="false" />
  </div>
</template>

<script>
import ListMixin from './ListMixin'
export default {
  name: 'Top',
  mixins: [
    ListMixin
  ],
  data () {
    return {
      limit: 5
    }
  },
  mounted () {
    this._getList(1)
  }
}
</script>

<style lang="scss" scoped>
</style>
