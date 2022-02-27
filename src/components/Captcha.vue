<template>
  <div class="layui-word-aux auth-code" v-html="svg" @click="getCaptcha"></div>
</template>
<script>
import { getCaptcha } from '@/api/login.js'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'Captcha',
  data () {
    return {
      svg: ''
    }
  },
  mounted () {
    // const localUuid = localStorage.getItem('uuid')
    // console.log('前', localUuid)
    // if (localUuid) {
    //   this.$store.commit('SETUUID', localUuid)
    //   this.getCaptcha()
    // } else {
    //   const uuid = uuidv4()
    //   console.log('new', uuid)
    //   localStorage.setItem('uuid', uuid)
    //   this.$store.commit('SETUUID', localUuid)
    //   this.getCaptcha()
    // }
    // console.log('后', localUuid)
    let uid = ''
    if (localStorage.getItem('uuid')) {
      uid = localStorage.getItem('uuid')
    } else {
      uid = uuidv4()
      // localStorage.setItem(uid)
    }
    this.$store.commit('SETUUID', uid)
    this.getCaptcha()
  },
  methods: {
    getCaptcha () {
      const uid = this.$store.state.uuid
      // console.log('getCaptcha', uid)
      const params = { uuid: uid }
      getCaptcha(params).then(res => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.auth-code {
  display: inline-block;
  width: 180;
  height: 43px;
  position: relative;
  top: 0px;
  left: 60px;
}
</style>
