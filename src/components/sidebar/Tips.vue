<template>
  <div class="fly-panel">
    <h3 class="fly-panel-title">温馨通道</h3>
    <div class="fly-panel-main layui-row" v-if="lists.length !== 0">
      <ul class="layui-clear chen-quick">
        <li
          class="layui-col-xs6"
          v-for="(item, index) in lists"
          :key="'tips' + index"
        >
          <a href target="_blank">{{ item.title }}</a>
        </li>
      </ul>
    </div>
    <div class="fly-panel-main layui-row no-data" v-else>
      <span>无数据</span>
    </div>
  </div>
</template>

<script>
import { getTips } from '@/api/content'
export default {
  name: 'tips',
  data () {
    return {
      lists: []
    }
  },
  mounted () {
    this._getTips()
  },
  methods: {
    _getTips () {
      getTips().then(res => {
        if (res.code === 200) {
          this.lists = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$border-color: #f2f2f2;
.fly-panel-main {
  padding: 15px;
}

.no-data {
  text-align: center;
}
.chen-quick {
  border: 1px solid $border-color;
  border-bottom: none;
  border-right: none;
  .layui-col-xs6 {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    border: 1px solid $border-color;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    border-left: none;
    border-top: none;
    a {
      display: block;
    }
  }
}
</style>
