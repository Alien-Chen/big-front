<template>
  <div>
    <panel></panel>
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8">
          <List />
        </div>
        <div class="layui-col-md4">
          <Tips />
          <Sign />
          <HotList />
          <Ads />
          <Links />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PanelVue from '@/components/Panel.vue'
import Ads from '@/components/sidebar/Ads.vue'
import HotList from '@/components/sidebar/HotList.vue'
import Links from '@/components/sidebar/Links.vue'
import Sign from '@/components/sidebar/Sign.vue'
import Tips from '@/components/sidebar/Tips.vue'
import List from '@/components/contents/List.vue'
export default {
  name: 'Home',
  components: {
    panel: PanelVue,
    Ads,
    Links,
    HotList,
    Sign,
    Tips,
    List
  }
}
</script>

<style scoped lang="scss">
</style>
