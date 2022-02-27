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
@import "assets/css/utilities.scss";

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
.error-text {
  display: block;
  color: rgba(240, 20, 20, 0.8);
}

@for $i from 0 to 5 {
  .pd#{$i} {
    padding: $i * 10 + px;
  }
  .pl#{$i} {
    padding-left: $i * 10 + px;
  }
  .pt#{$i} {
    padding-top: $i * 10 + px !important;
  }
  .pb#{$i} {
    padding-bottom: $i * 10 + px !important;
  }
  .pr#{$i} {
    padding-right: $i * 10 + px;
  }
  .mt#{$i} {
    margin-top: $i * 10 + px !important;
  }
  .ml#{$i} {
    margin-left: $i * 10 + px !important;
  }
}

.mt20 {
  margin-top: -20px;
}
.d-hide {
  position: absolute;
  overflow: hidden;
  height: 0;
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

.d-flex {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  &.flex-start {
    justify-content: flex-start;
  }
  &.flex-end {
    justify-content: flex-end;
  }
  &.flex-center {
    justify-content: center;
  }
}
</style>
