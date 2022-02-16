import ListItems from './ListItems.vue'
import { getList } from '@/api/content'

export default {
  data () {
    return {
      list: [],
      page: 0,
      limit: 20,
      catalog: '',
      sort: 'created',
      status: '',
      isEnd: false,
      current: '',
      isRequest: false
    }
  },
  components: { ListItems },
  methods: {
    _getList (type) {
      if (this.isRequest) {
        return
      }
      if (this.isEnd) {
        return
      }
      this.isRequest = true
      const params = {
        type: type,
        page: this.page,
        catalog: this.catalog,
        sort: this.sort,
        status: this.status

      }
      getList(params).then((res) => {
        this.isRequest = false
        if (res.code === 200) {
          if (res.data.length < this.limit) {
            this.isEnd = true
          }
          if (this.list.length === 0) {
            this.list = res.data
          } else {
            this.list = this.list.concat(res.data)
          }
        }
      }).catch((err) => {
        this.isRequest = false
        console.log(err)
      })
    }
  }
}
