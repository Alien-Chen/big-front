<template>
  <div class="layui-container">
    <panel></panel>
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8 content detail">
        <div class="fly-panel detail-box">
          <h1>{{ page.title }}</h1>
          <div class="fly-detail-info">
            <!-- <span class="layui-badge">审核中</span> -->
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-if="page.catalog === 'share'"
              >分享</span
            >
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'ask'"
              >提问</span
            >
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'advise'"
              >建议</span
            >
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'logs'"
              >动态</span
            >
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'discuss'"
              >交流</span
            >
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'notice'"
              >公告</span
            >

            <span
              class="layui-badge"
              style="background-color: #999"
              v-if="page.isEnd === '0'"
              >未结</span
            >
            <span class="layui-badge" style="background-color: #5fb878" v-else
              >已结</span
            >

            <span class="layui-badge layui-bg-black" v-show="page.isTop === '1'"
              >置顶</span
            >
            <span
              class="layui-badge"
              :class="tag.class"
              v-for="(tag, index) in page.tags"
              :key="'tags' + index"
              >{{ tag.name }}</span
            >

            <!--
              <div class="fly-admin-box" data-id="123">
              <span class="layui-btn layui-btn-xs jie-admin" type="del">删除</span>

              <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="1">置顶</span>
              <span
                class="layui-btn layui-btn-xs jie-admin"
                type="set"
                field="stick"
                rank="0"
                style="background-color:#ccc;"
              >取消置顶</span>

              <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="1">加精</span>
              <span
                class="layui-btn layui-btn-xs jie-admin"
                type="set"
                field="status"
                rank="0"
                style="background-color:#ccc;"
              >取消加精</span>
            </div>
            -->
            <span class="fly-list-nums">
              <a href="#comment">
                <i class="iconfont" title="回答">&#xe60c;</i>
                {{ page.answer }}
              </a>
              <i class="iconfont" title="人气">&#xe60b;</i>
              {{ page.reads }}
            </span>
          </div>
          <!-- 收藏、作者信息 -->
          <div class="detail-about">
            <a class="fly-avatar" href="../user/home.html">
              <img :src="page.uid ? page.uid.pic : '/img/bear-200-200.jpg'" />
            </a>
            <div class="fly-detail-user">
              <a href="../user/home.html" class="fly-link">
                <cite>{{ page.uid ? page.uid.nickname : "无名氏" }}</cite>
                <!-- <i class="iconfont icon-renzheng" title="认证信息："></i> -->
                <i
                  class="layui-badge fly-badge-vip mr1"
                  v-if="
                    page.uid && page.uid.isVip !== '0' ? page.uid.isVip : false
                  "
                  >VIP{{ page.uid.isVip }}</i
                >
              </a>
              <span>{{ page.created | createDate }}</span>
            </div>
            <div class="detail-hits">
              <span style="padding-right: 10px; color: #ff7200"
                >悬赏：{{ page.fav }}</span
              >
            </div>
          </div>
          <!-- <div class="layui-btn-container fly-detail-admin pt1">
            <a href class="layui-btn layui-btn-sm jie-admin">编辑</a>
            <a href class="layui-btn layui-btn-sm jie-admin-collect">收藏</a>
          </div> -->
          <div class="detail-body photos" v-html="content"></div>
        </div>

        <!-- 回帖相关的内容 -->
        <div class="fly-panel detail-box" id="flyReply">
          <fieldset
            class="layui-elem-field layui-field-title"
            style="text-align: center"
          >
            <legend>回帖</legend>
          </fieldset>

          <ul class="jieda" id="jieda">
            <li
              class="jieda-daan"
              v-for="(item, index) in comments"
              :key="'comments' + item._id"
            >
              <div class="detail-about detail-about-reply">
                <a class="fly-avatar" href>
                  <img
                    :src="item.cuid ? item.cuid.pic : '/img/bear-200-200.jpg'"
                    alt=" "
                  />
                </a>
                <div class="fly-detail-user">
                  <a href class="fly-link">
                    <cite>{{ item.cuid ? item.cuid.name : "chen" }}</cite>
                    <i
                      v-if="
                        item.cuid && item.cuid.isVip !== '0'
                          ? item.cuid.isVip
                          : false
                      "
                      class="layui-badge fly-badge-vip"
                      >VIP{{ item.cuid.isVip }}</i
                    >
                  </a>

                  <span v-if="index === 0">(楼主)</span>
                  <!--
                <span style="color:#5FB878">(管理员)</span>
                <span style="color:#FF9E3F">（社区之光）</span>
                <span style="color:#999">（该号已被封）</span>
                  -->
                </div>

                <div class="detail-hits">
                  <span>{{ item.created | createDate }}</span>
                </div>

                <i
                  class="iconfont icon-caina"
                  title="最佳答案"
                  v-show="item.isBest === '1'"
                ></i>
              </div>
              <div
                class="detail-body jieda-body photos"
                v-richtext="item.content"
              ></div>
              <div class="jieda-reply">
                <span
                  class="jieda-zan"
                  :class="{ zanok: item.handed === '1' }"
                  type="zan"
                  @click="hands(item)"
                >
                  <i class="iconfont icon-zan"></i>
                  <em>{{ item.hands }}</em>
                </span>
                <!-- <span type="reply">
                  <i class="iconfont icon-svgmoban53"></i>
                  回复
                </span> -->
                <div class="jieda-admin">
                  <span
                    v-show="page.isEnd === '0' && item.cuid._id === user._id"
                    @click="editComment(item)"
                    >编辑</span
                  >
                  <!-- <span type="del">删除</span> -->
                  <span
                    class="jieda-accept"
                    v-show="page.isEnd === '0' && item.cuid._id === user._id"
                    @click="setBest(item)"
                    >采纳</span
                  >
                </div>
              </div>
            </li>
            <!-- 无数据时 -->
            <li class="fly-none" v-if="comments.length === 0">消灭零回复</li>
          </ul>
          <page
            ref="pagination"
            v-if="total > 0"
            :showType="'icon'"
            :hasSelect="true"
            :total="total"
            :hasTotal="false"
            :size="size"
            :current="current"
            :showEnd="true"
            @changeCurrent="handleChange"
            @changeLimit="handleLimit"
          ></page>
          <div class="layui-form layui-form-pane">
            <form>
              <validation-observer ref="observer" v-slot="{ validate }">
                <edit
                  ref="commentEdit"
                  @changeContent="addContent"
                  :initContent="editInfo.content"
                ></edit>
                <div class="layui-form-item">
                  <validation-provider
                    name="authCode"
                    ref="codefield"
                    rules="required|length:4"
                    v-slot="{ errors }"
                  >
                    <div class="layui-row">
                      <label for="L_vercode" class="layui-form-label"
                        >验证码</label
                      >
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          name="authCode"
                          v-model="code"
                          placeholder="请输入验证码"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <captcha ref="captcha" />
                    </div>
                    <div class="layui-form-mid">
                      <span class="error-text">{{ errors[0] }}</span>
                    </div>
                  </validation-provider>
                </div>
                <div class="layui-form-item">
                  <button
                    class="layui-btn"
                    type="button"
                    @click="validate().then(submit)"
                  >
                    提交回复
                  </button>
                </div>
              </validation-observer>
            </form>
          </div>
        </div>
      </div>
      <div class="layui-col-md4">
        <hotlist></hotlist>
        <ads></ads>
        <links></links>
      </div>
    </div>
  </div>
</template>

<script>
import { getDetail } from '@/api/content'
import { getComents, addComment, updateComment, setCommentBest, setHands } from '@/api/comments'
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
import Panel from '@/components/Panel'
import Editor from '../modules/editor/index'
import Pagination from '@/components/modules/pagination/index'
import { escapeHtml } from '@/utils/escapeHtml'
import Captcha from '@/components/Captcha'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { scrollToElem } from '@/utils/common'

export default {
  name: 'Detail',
  props: ['tid'],
  components: {
    hotlist: HotList,
    ads: Ads,
    links: Links,
    panel: Panel,
    edit: Editor,
    page: Pagination,
    captcha: Captcha,
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      total: 0,
      size: 10,
      current: 0,
      page: {},
      comments: [],
      editInfo: {
        content: '',
        code: '',
        sid: ''
      },
      code: ''
    }
  },
  mounted () {
    this.getPostDetail()
    this.getCommentsList()
  },
  methods: {
    handleChange (val) {
      this.current = val
      this.getCommentsList()
    },
    // 更改每页列表显示数
    handleLimit (val) {
      this.size = val
      this.getCommentsList()
    },
    getPostDetail () {
      getDetail(this.tid).then((res) => {
        if (res.code === 200) {
          this.page = res.data
        }
      })
    },
    getCommentsList () {
      // console.log(this.tid)
      getComents({
        tid: this.tid,
        page: this.current,
        limit: this.size
      }).then((res) => {
        if (res.code === 200) {
          this.comments = res.data
          this.total = res.total
        }
      })
    },
    addContent (val) {
      this.editInfo.content = val
    },
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        // ABORT!!
        return
      }
      // 用户未登录
      const isLogin = this.$store.state.isLogin
      if (!isLogin) {
        this.$pop('shake', '请先登录')
        return
      }
      // 用户禁言状态判断
      const user = this.$store.state.userInfo
      if (user.status !== '0') {
        this.$pop('shake', '用户已经禁言，请联系管理员')
        return
      }
      this.editInfo.code = this.code
      this.editInfo.sid = this.$store.state.uuid
      this.editInfo.tid = this.tid
      // 获取评论用户的信息：图片、昵称、vip
      const cuid = {
        _id: user._id,
        pic: user.pic,
        name: user.name,
        isVip: user.isVip
      }

      if (typeof this.editInfo.cid !== 'undefined' && this.editInfo.cid !== '') {
        const obj = { ...this.editInfo }
        delete obj.item
        // 判断用户是否修改了内容
        if (this.editInfo.content === this.editInfo.item.content) {
          this.$pop('shake', '确定编辑了内容~~~')
          return
        }
        // 更新评论
        updateComment(obj).then((res) => {
          if (res.code === 200) {
            const temp = this.editInfo.item
            temp.content = this.editInfo.content
            this.$pop('', '更新评论成功')
            this.code = ''
            this.editInfo.content = ''
            // 方法一，只用更新特定的一条的content created， $set
            // 方法二，更新整个数组中的这一条
            this.comments.splice(this.comments.indexOf(this.editInfo.item), 1, temp)
          }
        })
        return
      }
      // 添加评论
      addComment(this.editInfo).then((res) => {
        if (res.code === 200) {
          this.$pop('', '发表评论成功')
          // 发表评论成功后，清空回复内容
          this.code = ''
          this.editInfo.content = ''
          res.data.cuid = cuid
          // 添加新的评论到评论列表
          this.comments.push(res.data)
          this.total += 1
          if (this.comments.length > this.size) {
            this.comments = this.comments.slice(0, this.size)
          }
          requestAnimationFrame(() => {
            this.$refs.observer && this.$refs.observer.reset()
          })
          // 刷新图形验证码
          this.$refs.captcha.getCaptcha()
        } else {
          this.$pop('', res.msg)
        }
      })
    },
    editComment (item) {
      this.editInfo.content = item.content
      scrollToElem('.layui-input-block', 500, -65)
      document.getElementById('edit').focus()
      // 确定需要去编辑的记录
      this.editInfo.cid = item._id
      this.editInfo.item = item
    },
    hands (item) {
      setHands({ cid: item._id }).then((res) => {
        if (res.code === 200) {
          this.$pop('', '点赞成功')
          item.handed = '1'
          item.hands += 1
        } else {
          this.$pop('shake', res.msg)
        }
      })
    },
    setBest (item) {
      this.$message('确定采纳为最佳答案吗?', () => {
        console.log('采纳')
        // 发送采纳最佳答案请求
        setCommentBest({
          cid: item._id,
          tid: this.tid
        }).then((res) => {
          if (res.code === 200) {
            this.$pop('', '设置最佳答案成功！')
            item.isBest = '1'
            this.page.isEnd = '1'
          }
        })
        // console.log(item._id)
      }, () => { })
    }
  },
  computed: {
    content () {
      if (this.page.content && this.page.content.trim() === '') {
        return ''
      }
      return escapeHtml(this.page.content)
    },
    user () {
      return this.$store.state.userInfo
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-body {
  margin-top: 10px;
}
.fly-detail-admin {
  text-align: right;
  border-top: 1px dotted #eaeaea;
  background: #f8f8f8;
}

.fly-detail-info {
  span {
    margin-right: 5px;
  }
}

.jieda-body {
  margin: 25px 0 20px !important;
}
</style>
