<template>
  <div>
    <panel></panel>
    <router-view></router-view>
  </div>
</template>

<script>
import PanelVue from '@/components/Panel.vue'

export default {
  name: 'Home',
  components: {
    panel: PanelVue
  }
}
</script>

<style scoped lang="scss">
</style>
