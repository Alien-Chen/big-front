<template>
  <div id="app">
    <chen-header />
    <router-view></router-view>
    <chen-footer />
  </div>
</template>
<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default {
  name: 'App',
  components: {
    ChenHeader: Header,
    ChenFooter: Footer
  }
}
</script>
<style lang="scss">
@import "assets/layui/css/layui.css";
@import "assets/css/global.css";
@import "assets/layui/css/modules/layer/default/layer.css";
</style>
