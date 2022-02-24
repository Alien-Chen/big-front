<template>
  <div id="app">
    <chen-header />
    <router-view></router-view>
    <!-- <chen-footer /> -->
  </div>
</template>
<script>
import Header from './components/Header.vue'
// import Footer from './components/Footer.vue'
export default {
  name: 'App',
  components: {
    ChenHeader: Header
    // ChenFooter: Footer
  }
}
</script>
<style lang="scss">
@import "assets/layui/css/layui.css";
@import "assets/css/global.css";
@import "assets/layui/css/modules/layer/default/layer.css";

// 公用样式
.svg {
  position: relative;
  top: -4px;
}
.gray {
  color: #999;
}

// .pd20 {
//   padding: 20px;
// }

@for $i from 0 to 5 {
  .pd#{$i} {
    padding: $i * 10 + px;
  }
  .pl#{$i} {
    padding-left: $i * 10 + px;
  }
  .pr#{$i} {
    padding-right: $i * 10 + px;
  }
}

.mt20 {
  margin-top: -20px;
}

.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
</style>
