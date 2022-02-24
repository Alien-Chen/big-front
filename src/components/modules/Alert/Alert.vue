<template>
  <div class="alert-wrap" v-show="isShow" @click="close">
    <div class="alert-box">
      <div class="alert-content">{{ msg }}</div>
      <div class="alert-footer">
        <div class="btn confirm-btn" @click="close">确定</div>
        <div class="btn cancel-btn" @click="close">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Alert',
  data () {
    return {
      isShow: false
    }
  },
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  methods: {
    close () {
      this.isShow = false
    }
  }
}
</script>
<style lang="scss" scoped>
.alert-wrap {
  position: fixed;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99999;
}
.alert-box {
  position: relative;
  top: 50%;
  display: flex;
  flex-direction: column;
  background: #fff;
  margin: 0 auto;
  transform: translateY(-50%);
  width: 400px;
  height: 200px;
  border-radius: 5px;
  box-shadow: 0px 0px 4px #ccc;
}
.alert-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.alert-footer {
  display: flex;
  justify-content: center;
  padding: 10px;
}
.btn {
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
  &.confirm-btn {
    background: #b6cd59;
    color: #fff;
  }
}
</style>
