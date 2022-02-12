<template>
  <div class="panel">
    <div class="layui-container" style="overflow: hidden">
      <ul>
        <!-- <li><a href="">首页</a></li> -->
        <li><a href="">提问</a></li>
        <li><a href="">分享</a></li>
        <li><a href="">讨论</a></li>
        <li><a href="">建议</a></li>
        <li><a href="">公告</a></li>
        <li><a href="">动态</a></li>
        <li class="layui-hide-xs"><span class="line"></span></li>
        <li class="layui-hide-xs layui-hide-sm"><a href="">我发表的贴</a></li>
        <li class="layui-hide-xs layui-hide-sm"><a href="">我收藏的贴</a></li>
      </ul>
      <div class="right layui-hide-xs">
        <span class="layui-icon layui-icon-search"></span>
        <a href="" class="layui-btn">发表新帖</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Panel'
}
</script>

<style scoped lang="scss">
@media (max-width: 768px) {
  .panel {
    height: auto !important;
  }
  ul {
    li {
      width: 33.3%;
    }
  }
}
.panel {
  height: 50px;
  line-height: 50px;
  margin-bottom: 15px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
ul {
  width: 100%;
  float: left;
  margin-right: -200px;
  li {
    display: inline-block;
    a {
      padding: 0 20px;
    }
  }
  .line {
    display: inline-block;
    height: 10px;
    width: 1px;
    vertical-align: middle;
    margin: 0 20px;
    background: $color-text-primary;
  }
}
.right {
  float: right;
  .layui-icon-search {
    margin-right: 20px;
    font-size: 20px;
    &:hover {
      color: $color-primary;
      cursor: pointer;
    }
  }
}
</style>
