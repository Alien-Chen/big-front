<template>
  <div class="layui-container flex">
    <img src="../assets/icon-404.gif" width="500px" alt />
    <router-link class="layui-btn" to="/">回到首页</router-link>
  </div>
</template>

<script>
export default {
  name: '404'
}
</script>

<style lang="scss" scoped>
.flex {
  width: 100%;
  height: calc(100vh - 61px);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

p {
  padding-bottom: 15px;
  padding-top: 10px;
  color: #ddd;
}

.layui-btn {
  margin-top: 10px;
}
</style>
